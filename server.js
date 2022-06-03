const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const secret = "radhe@shyam!@#!@#!@#!@#@!#"
// mongodb starts
const url = 'mongodb+srv://radhe:3!5Wr!e95!3k49J@cluster0.t0ienvm.mongodb.net/p1?retryWrites=true&w=majority'
mongoose.connect(url)

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
})

const usersModel = new mongoose.model("users", usersSchema)
// mongodb ends


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/login", (req, res) => {
    let { email, password } = req.body
    usersModel.find({ email, password })
        .then(d => {
            if (d?.length === 0) {
                res.json({ msg: "failed to login" })
            }
            else {
                // res.json(d[0])
                jwt.sign({ id: d[0].id }, secret,{expiresIn:"30s"}, (err, data) => {
                    res.json(err ? err : data)
                })
                // logged in success
                // res.json(d)
            }
        })
        .catch(e => res.json(e))


})
app.post("/signup", (req, res) => {
    let { name, email, phone, password } = req.body
    usersModel.find({ email })
        .then(d => res.json(d))
        .catch(e => res.json(e))

})
app.get("/", (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            usersModel.findById(data?.id)
                .then(d => res.json(d))
                .catch(e => res.json(e))
        }
    })
})



app.listen(4000, () => console.log("server started on port 4000"))