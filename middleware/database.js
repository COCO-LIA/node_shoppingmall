const mongoose = require('mongoose')




// DB 커넥트

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}


mongoose
    .connect(process.env.MONGODB_URI, dbOptions )
    .then(() => console.log("DB connected")) // db에 성공했을 때 행동
    .catch(err => console.log("+++++++++++++++++++", err.message)) //db에 실패했을 때 행동

