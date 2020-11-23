//1
const mongoose = require('mongoose')

//2
const productSchema = mongoose.Schema({
    // 4
    name : String,
    price : Number,
    category: String
})



// 3

module.exports = mongoose.model("product", productSchema)

