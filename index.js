const express = require('express')
const app = express();
const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://sormer:Sormerrenan123@cluster0-hkwdl.mongodb.net/boilerplate?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true}, console.log('connected'))

app.get('/',(req,res)=>{
    res.json({ok:true})
})

app.listen(3000, console.log('funcionando'))
