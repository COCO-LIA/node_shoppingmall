
const express = require("express")
const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const {
    orders_get_all,
    orders_get_order,
    orders_post_order,
    orders_patch_order,
    orders_delete_all
} = require('../controller/order')

// order 불러오는 API
router.get("/",checkAuth, orders_get_all)

//상세 불러오기 API
router.get("/:orderId", checkAuth, orders_get_order)

// order 등록해주는 API
router.post("/",checkAuth, orders_post_order)

// order 수정하는 API
router.patch("/", checkAuth, orders_patch_order)

// order 삭제하는 API
router.delete("/", checkAuth, orders_delete_all)

module.exports = router