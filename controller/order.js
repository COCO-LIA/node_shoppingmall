
const orderModel = require('../model/odrer')


//전체 order 불러오는 코드
exports.orders_get_all = (req, res) => {
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


};

//상세 order 불러오는 코드
exports.orders_get_order = (req, res) => {

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
};

//order 등록해주는 코드
exports.orders_post_order = (req, res) => {
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

};

//order 수정해주는 코드
exports.orders_patch_order = (req, res) => {
    res.json({
        msg:"order수정하는 API"
    })
};

//order 전체삭제하는 코드
exports.orders_delete_all = (req, res) =>{
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
};