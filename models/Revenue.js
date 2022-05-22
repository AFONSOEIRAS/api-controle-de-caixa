const mongoose = require("mongoose")

const Revenue = mongoose.model("Revenue", {
    name: String,
    money: Number
})

module.exports = Revenue