const mongoose = require("mongoose")

const Outgo = mongoose.model("Outgo", {
    name: String,
    money: Number
})

module.exports = Outgo