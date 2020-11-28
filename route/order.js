
const express = require("express")
const router = express.Router()

const orderModel = require('../model/odrer')

// order 불러오는 API
router.get("/", (req, res) => {
    // res.json( {
    //     message : "order get"
    // })

    orderModel
        .find()
        .populate("product", ["name", "price"])
        .then(docs => {
            res.json({
                msg: "order total get",
                count: docs.length,
                orders: docs.map(doc => {
                    return{
                        id: doc._id,
                        product:doc.product,
                        quantity:doc.quantity,
                        request: {
                            type: 'GET',
                            url: "http://localhost:5000/order/" + doc._id
                        }
                    }
                })
            })
        })


})

//상세 불러오기 API
router.get("/:orderId", (req, res) => {

    orderModel
        .findById(req.params.orderId)
        .populate("product", ["name", "price"])
        .then(item => {
            res.json({
                msg: "order data" + item._id,
                orderInfo: {
                    id: item._id,
                    product: item.product,
                    quantity: item.quantity,
                    reqest:{
                        type: 'GET',
                        url: "http://localhost:5000/order/"
                    }
                }
            })
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
    // res.json({
    //     msg:"order 삭제하는 api"
    // })
    orderModel
        .deleteMany()
        .then(() => {
            res.json({
                msg: "delete ordered",
                request: {
                    type: 'GET',
                    url: "http://localhost:5000/order/"
                }
            })

        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

module.exports = router