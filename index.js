import express from 'express'
import { connection } from './db/dbConnection.js'
import path from 'path'
import { userModel } from './db/models/user.model.js'
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('views','viewss')

app.post('/addUser',async(req,res)=>{
    await userModel.insertMany(req.body)
    res.redirect('/')
})

app.get('/delete/:id',async(req,res)=>{
    // console.log(req.params);
    await userModel.findByIdAndDelete(req.params.id)
    
    res.redirect('/')
})
app.get('/', async(req, res) => {
  let users = await userModel.find()
    res.render('index.ejs',{name:"Ahmed",users})
})
app.get('/update/:id', async(req, res) => {
    let user = await userModel.findById(req.params.id)
    res.render('update.ejs',{user})
})

app.post('/handleUpdate/:id',async(req,res)=>{
await userModel.findByIdAndUpdate(req.params.id,req.body)
    res.redirect('/')
})



connection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))