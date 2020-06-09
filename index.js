const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const {User} = require('./model/user')
const env = require('dotenv').config()
const config = require('./config/key')


//db connection
mongoose.connect(config.mongoURI,{useNewUrlParser:true, useUnifiedTopology:true}, console.log('connected'))

//midlewares
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('dev'))




app.post('/',(req,res)=>{
    let user = new User(req.body)
    user.save((err,user)=>{
        if(err) return res.json({success:false, err}) 
        return res.status(200).json({user})
    })
})

app.listen(3000, console.log('funcionando'))
