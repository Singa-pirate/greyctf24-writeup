// format functions

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