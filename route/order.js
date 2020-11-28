
const express = require("express")
const router = express.Router()

const orderModel = require('../model/odrer')

// order 불러오는 API
router.get("/2222", (req, res) => {
    res.json( {
        message : "order get"
    })
})

// order 등록해주는 API
router.post("/",(req, res) => {
    // res.json({
    //     msg: "order등록해주는 API"
    // })

    const orderInfo = new orderModel({
        product: req.body.productId,
        quantity: req.body.qty
    })

    orderInfo
        .save()
        .then(item =>{
            res.json({
                msg: "장바구니담기 ",
                orderInfo: item
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })




})

// order 수정하는 API
router.patch("/", (req, res) => {
    res.json({
        msg:"order수정하는 API"
    })
})


// order 삭제하는 API
router.delete("/", (req, res) =>{
    res.json({
        msg:"order 삭제하는 api"
    })
})

module.exports = router