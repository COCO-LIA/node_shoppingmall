//1

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const userModel = require('../model/user')

//3 API
//회원가입 API
router.post("/register", (req, res) => {

    // email 유무체크 -> 패스워드 암호화 -> 데이터베이스에 유저정보 저장
    userModel
        .findOne({email: req.body.em})
        .then(user => {
            if(user) {
                return res.json({
                    msg: "다른 이메일로 회원가입 해주십시오."
                })
            } else {
                bcrypt.hash(req.body.paw, 10, (err, hash) => {

                    if(err) {
                        return res.json({
                            error: err
                        })
                    }
                    else {
                        const  userInfo = new  userModel({
                            username:req.body.usn,
                            email:req.body.em,
                            password:hash

                        })

                        userInfo
                            .save()
                            .then(user => {
                                res.json({
                                    msg: " 회원가입 됐습니다 ",
                                    userInfo: user

                                })
                            })
                            .catch(err => {
                                res.json({
                                    msg: err.message
                                })
                            })
                    }
                })

            }
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })





    //









})




// 로그인 API
router.post("/login", (req, res) => {

})

//2

module.exports = router