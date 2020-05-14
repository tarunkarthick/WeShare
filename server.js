const express=require('express')

const app=express()
const mongoose=require('mongoose')

const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const expressValidator=require('express-validator')
const fs=require('fs')
const cors=require('cors')
const path=require('path')
const dotenv=require('dotenv')
dotenv.config()

//db
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
.then(()=>{
    console.log('DB connected')
})

mongoose.connection.on('error',err=>{
    console.log(`DB connection error:${err.message}`)
})

//bring in routes 
const postRoutes=require('./routes/post')
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')

//apiDocs
app.get("/api",(req,res)=>{
    fs.readFile('docs/apiDocs.json',(err,data)=>{
        if(err){
          res.status(400).json({
            error:err
          })
        }
        const docs=JSON.parse(data)
        res.json(docs)
    })
})

//middleware
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(cookieParser())

app.use(expressValidator())

app.use(cors())

app.use("/api",postRoutes)
app.use("/api",authRoutes)
app.use("/api",userRoutes)


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error:"Unauthorized!"});
    }
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build')); // serve the static react app
    app.get(/^\/(?!api).*/, (req, res) => { // don't serve api routes to react app
      res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
    console.log('Serving React App...');
  };


const port=process.env.PORT||3001

app.listen(port,()=>{
    console.log(`A node js API is listening on port:${port}`)
})