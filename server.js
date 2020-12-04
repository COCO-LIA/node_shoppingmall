

// 코드 빌드 순서
// 첫번째: = 를 기준으로 오른쪽에서 왼쪽으로 대입한다.
// 두번째: 코드 빌드 순서는 위에서 아래로
// 세번째: 하위 메소드를 불러오는 방법은 . 으로 표시한다.

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()



// DB 커넥트
const dbAddress = "mongodb+srv://admin:qwer@cluster0.huxry.mongodb.net/shoppingmall?retryWrites=true&w=majority"

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}


mongoose
    .connect(dbAddress, dbOptions )
    .then(() => console.log("DB connected")) // db에 성공했을 때 행동
    .catch(err => console.log("+++++++++++++++++++", err.message)) //db에 실패했을 때 행동



const productRoute = require("./route/product")
const orderRoute = require("./route/order")
const userRoute = require("./route/user")

// 미들웨어 설정
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use("/product", productRoute)
app.use("/order",orderRoute)
app.use("/user", userRoute)

const port = 5000

app.listen(port, console.log("Server started"))
