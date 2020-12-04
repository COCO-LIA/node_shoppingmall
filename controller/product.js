
const productModel = require('../model/product')

// 전체 product불러오는 코드
exports.products_get_all = (req, res) => {

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
};


// 상세 product 불러오는 코드
exports.products_get_product = (req, res) => {

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


};


// product 등록하는 코드
exports.products_post_product = (req, res) => {

    const { name, price, category } = req.body;

    const productInfo = new productModel({
        name, price, category
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



};


//product 수정하는 코드
exports.products_patch_product = (req, res) => {
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

};


// product 삭제하는 코드
exports.products_delete_all = (req, res) => {
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
};

// 특정 product 삭제하는 코드
exports.products_delete_product = (req, res) => {
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
};