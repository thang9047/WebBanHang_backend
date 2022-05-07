require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
  useTempFiles: true
}))

// Router
app.use('/user', require('./router/userRouter'))
app.use('/api', require('./router/categoryRouter'))
app.use('/api', require('./router/productRouter'))
app.use('/api', require('./router/upload'))

// Connect DB
const URI = process.env.MONGDB_URL
try{
  mongoose.connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
console.log('Connect success to MongDb')
}
catch(err) {
  console.log('Connect false ' + err);
}

app.get('/', (req, res) => {
  res.status(200).send("Hí mấy con gà !!");
})


const port = 5500;

app.listen(port, () => {
  console.log("app is running at port ", port);
})

