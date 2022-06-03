const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

// mongodb starts
const url = 'mongodb+srv://radhe:3!5Wr!e95!3k49J@cluster0.t0ienvm.mongodb.net/?retryWrites=true&w=majority'
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


app.get("/", (req, res) => {
    usersModel.find().then(d => res.json(d)).catch(e => res.json(e))
})
app.post("/", (req, res) => {
    usersModel.create(req.body).then(d => res.json(d)).catch(e => res.json(e))
})

app.patch("/:id", (req, res) => {
    usersModel.findByIdAndUpdate(req.params.id, req.body).then(d => res.json(d)).catch(e => res.json(d))
})
app.delete("/:id", (req, res) => {
    usersModel.findByIdAndDelete(req.params.id).then(d => res.json(d)).catch(e => res.json(d))
})





app.listen(4000, () => console.log("server started on port 4000"))