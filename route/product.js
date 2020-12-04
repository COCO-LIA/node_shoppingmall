// 1
const express = require("express")
const router = express.Router()


const productModel = require('../model/product')
const checkAuth = require('../middleware/check-auth')


// 3

// product 불러오는 API
router.get("/1111", (req, res) => {

    productModel
        .find()
        .then(docs => {
            res.json({
                msg: "product total get",
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        category: doc.category,
                        request: {
                            type: 'GET',
                            url: "http://localhost:5000/product/" + doc._id
                        }

                    }
                })
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })


    // res.json({
    //     message : "ㅇㅏㅁㅜㄱㅓㄴㅏ"
    // })
})


// 상세 product 불러오는 API
router.get("/:productId", checkAuth, (req, res) => {

    productModel
        .findById(req.params.productId)
        .then(item => {
            res.json({
                msg: "get product data " + item._id,
                product: {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    reqest: {
                        type: 'GET',
                        url: "http://localhost:5000/product/1111"
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })


})


// product 등록해주는 API
router.post("/", checkAuth, (req, res) => {

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
                productInfo: {
                    id : item._id,
                    name : item.name,
                    price : item.price,
                    category: item.category,
                    request: {
                        type: 'GET',
                        url: "http://localhost:5000/product/" + item._id
                    }
                }

            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })



})



// product 수정하는 API
router.patch("/:productId",checkAuth, (req, res) => {
    // res.json( {
    //     msg:"product 수정주는 API"
    // })

    // 수정할 내용을 정의
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }


    productModel
        .findByIdAndUpdate(req.params.productId, { $set: updateOps})
        .then(() => {
            res.json({
                msg: "updated product " + req.params.productId,
                request:{
                    type: 'GET',
                    url: "http://localhost:5000/product/" + req.params.productId
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })

})






// 전체 product 삭제하는 API
router.delete("/", checkAuth, (req, res) => {
    productModel
        .deleteMany()
        .then(() => {
            res.json({
                msg: "deleted products",
                request: {
                    type: 'GET',
                    url: "http://localhost:5000/product/1111"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })



    // res.json({
    //     msg :"product 삭제해주는 API"
    // })
})

// 특정 product를 삭제하는 API
router.delete("/:productId", checkAuth, (req, res) => {
    productModel
        .findByIdAndDelete(req.params.productId)
        .then(() => {
            res.json({
                msg: " deleted product",
                request:{
                    type: 'GET',
                    url: "http://localhost:5000/product/1111"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})


// 2
module.exports = router