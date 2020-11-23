// 1
const express = require("express")
const router = express.Router()


const productModel = require('../model/product')

// 3

// product 불러오는 API
router.get("/1111", (req, res) => {
    res.json({
        message : "ㅇㅏㅁㅜㄱㅓㄴㅏ"
    })
})


// product 등록해주는 API
router.post("/",(req, res) => {

    // 사용자입력값설정
    //
    // const productInfo = {
    //     name: req.body.productname,
    //     price: req.body.productprice,
    //     category: req.body.category
    // }
    //
    //
    // res.json({
    //     msg: "product 등록해주는 API",
    //     product: productInfo
    // })

    const productInfo = new productModel({
        name: req.body.productname,
        price: req.body.productprice,
        category: req.body.category
    })

    productInfo
        .save()
        .then(item => {
            res.json({
                msg: "saved product",
                productInfo: item
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })



})

// product 수정하는 API
router.patch("/", (req, res) => {
    res.json( {
        msg:"product 수정주는 API"
    })
})

// product 삭제하는 API
router.delete("/", (req, res) => {
    res.json({
        msg :"product 삭제해주는 API"
    })
})



// 2
module.exports = router