const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../model/user')


//회원가입 불러오는 코드
exports.user_register = (req, res) => {

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

};

//로그인 불러오는 코드
exports.user_login = (req, res) => {

    // 이메일 유무체크 -> 패스워드 매칭-> 접속유저정보 뿌려주기(jwt 생성 )
    userModel
        .findOne({email: req.body.em})
        .then(user => {
            if(!user) {
                return  res.json({
                    msg: "등록되지 않은 이메일 입니다. 먼저 회원가입을 해 주십시오 "
                })
            } else {
                bcrypt.compare(req.body.paw, user.password, (err, isMatch) => {

                    if(err || isMatch === false){
                        return res.json({
                            msg: "Auth failed(password incorrected)"
                        })
                    } else {
                        // res.json(user)

                        // jwt 생성
                        const token = jwt.sign(
                            {id: user._id, email: user.email},
                            process.env.SECRET_KEY,
                            {expiresIn: "1h"} //1d. 1M
                        )
                        res.json({
                            msg: "Auth successful",
                            tokenInfo: token
                        })
                    }
                })


            }
        })
        .catch(err => {
            res.json({
                err: err.message
            })
        })

};

