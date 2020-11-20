

// 코드 빌드 순서
// 첫번째: = 를 기준으로 오른쪽에서 왼쪽으로 대입한다.
// 두번째: 코드 빌드 순서는 위에서 아래로
// 세번째: 하위 메소드를 불러오는 방법은 . 으로 표시한다.

const express = require('express')

const app = express()

// request response test
app.use((req, res) => {
    res.json({
        message: "서버 시작되었음"
    })
})

const port = 5000

app.listen(port, console.log("Server started"))
