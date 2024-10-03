const express = require('express')
require('dotenv').config()
const dotenv = require('dotenv')
const app = express();
const path = require('path');
const fs = require('fs')
const port = process.env.port || 3000; 
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
app.use(express.json())

// all routes wil be here
const authRouter = require('./route/authRoute')
const projectRouter = require('./route/projectRoute')
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/project', projectRouter) 

app.get('/', (req,res)=> {
  res.send("hello world")
})


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
  
// Express global error handler
app.use(globalErrorHandler)

app.listen(port, ()=> {
    console.log('Server is running on port:',port);
})