const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const path=require('path')
const methodOverride = require('method-override')
const app=express()

mongoose.connect('mongodb://localhost/bharatInternDatabase')


app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/',async(req,res)=>{
    const articles = await Article.find().sort({createAr:'desc'})
    res.render('articles/index',{articles:articles})

})
app.use(express.static(path.join(__dirname,'public')))
app.use('/articles',articleRouter)
app.listen(2000)