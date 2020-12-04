//1

const express = require('express')
const router = express.Router()

const {
    user_register,
    user_login
} = require('../controller/user')

//3 API
//회원가입 API
router.post("/register", user_register)


// 로그인 API
router.post("/login", user_login)

//2

module.exports = router