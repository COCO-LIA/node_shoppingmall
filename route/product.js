// 1
const express = require("express")
const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const {
    products_get_all,
    products_get_product,
    products_post_product,
    products_patch_product,
    products_delete_all,
    products_delete_product
} = require('../controller/product')


// 3

// product 불러오는 API
router.get("/1111", products_get_all)


// 상세 product 불러오는 API
router.get("/:productId", checkAuth, products_get_product)


// product 등록해주는 API
router.post("/", checkAuth, products_post_product)

// product 수정하는 API
router.patch("/:productId",checkAuth, products_patch_product)


// 전체 product 삭제하는 API
router.delete("/", checkAuth, products_delete_all)

// 특정 product를 삭제하는 API
router.delete("/:productId", checkAuth, products_delete_product)


// 2
module.exports = router