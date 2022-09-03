if(process.env.NODE_ENV !== 'production')
    require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const ExpressError = require('./utils/ExpressError')
const cors = require("cors");
app.use(cors({
  origin: process.env.FE_URL ||"http://localhost:3000", // allow to server to accept request from different origin
  // origin: "https://spiffy-pasca-a36c3f.netlify.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // allow session cookie from browser to pass through
}))
// /////////////////////////////////////////
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
app.use(express.urlencoded({extended:true}))
// connect to mongoDB
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/to_do_app"
mongoose.connect(dbUrl,{
})
  .then(() => console.log("Connection to mongoDB opens"))
  .catch(error => handleError(error));
function handleError(error) {
    console.log(error)
}
const User = require('./models/users')
// //////////////////////////////////////////
// Routes
const usersRoutes = require('./routes/users')
const todosRoutes = require('./routes/todos')
// /////////////////////////////////////////
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const secret = process.env.SECRET||"trivandeptrai"
app.use(session({
    // store:MongoDBStore.create({...options}),
    // name:"_van",
    resave:false,
    saveUninitialized:true,
    secret,
    cookie:{
        httpOnly:true,
        secure: (process.env.NODE_ENV && process.env.NODE_ENV == 'production') ? true:false,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
  }))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.post('/',async (req,res)=>{
  // console.log(req.user)
  const {id} = req.body
  const user = await User.findById(id)
  res.json({state:"success",user:user})
})

app.use('/',usersRoutes)
app.use('/todos',todosRoutes)

app.all('*',(req,res,next)=>{
    next(new ExpressError("Page not found",404))
  })
  app.use((err,req,res,next)=>{
    const {message = "Syntax error",status = 500} = err
    res.json({state:"fail",status,message})
  })
  
app.listen(process.env.PORT||3001, ()=>{
    console.log('server connected')
})