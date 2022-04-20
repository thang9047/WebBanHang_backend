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

// Connect DB
const URI = process.env.MONGDB_URL
try{
  mongoose.connect(URI, {
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
  console.log(`app is running at port ${port} ..`);
})

