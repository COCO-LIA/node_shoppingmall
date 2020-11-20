

// 코드 빌드 순서
// 첫번째: = 를 기준으로 오른쪽에서 왼쪽으로 대입한다.
// 두번째: 코드 빌드 순서는 위에서 아래로
// 세번째: 하위 메소드를 불러오는 방법은 . 으로 표시한다.

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// request response test
// app.use((req, res) => {
//     res.json({
//         message: "서버 시작되었음"
//     })
// })

const productRoute = require("./route/product")
const orderRoute = require("./route/order")

// 미들웨어 설정
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use("/product", productRoute)
app.use("/order",orderRoute)

const port = 5000

app.listen(port, console.log("Server started"))
