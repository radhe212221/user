const mongoose = require("mongoose")

const url = 'mongodb+srv://radhe:3!5Wr!e95!3k49J@cluster0.t0ienvm.mongodb.net/p1?retryWrites=true&w=majority'
mongoose.connect(url)

let a = [
    { name: "demo1", email: "demo1@gmail.com", phone: "99999991", password: "demo1@999" },
    { name: "demo2", email: "demo2@gmail.com", phone: "99999992", password: "demo2@999" },
    { name: "demo3", email: "demo3@gmail.com", phone: "99999993", password: "demo3@999" },
    { name: "demo4", email: "demo4@gmail.com", phone: "99999994", password: "demo4@999" },
    { name: "demo5", email: "demo5@gmail.com", phone: "99999995", password: "demo5@999" },
    { name: "demo6", email: "demo6@gmail.com", phone: "99999996", password: "demo6@999" },
    { name: "demo7", email: "demo7@gmail.com", phone: "99999997", password: "demo7@999" },
    { name: "demo8", email: "demo8@gmail.com", phone: "99999998", password: "demo8@999" },
    { name: "demo9", email: "demo9@gmail.com", phone: "99999999", password: "demo9@999" },
]


const model = new mongoose.model("users", {
    name: String,
    email: String,
    phone: String,
    password: String,
})

model.insertMany(a)
    .then(d => console.log(d))
    .catch(d => console.log("err", d))
    .finally(d => console.log("process completeed"))