//1

const mongoose = require('mongoose')

//2

const userSchema = mongoose.Schema({})

//3

module.exports = mongoose.model("user", userSchema)