// const express = require('express');
//old way to import
import express from 'express'; // new way to import
//go to package.json and add "type": "module" to use import syntax
import dotenv from 'dotenv';
import connectDB from './database/db.js'; 
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

connectDB();


const app = express();



const PORT = process.env.PORT || 3000;

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:8080', 
    credentials:true //to allow cookies to be sent
}));


//apis   middleware
app.use("/api/v1/user",userRoute)





app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})







// to start this server first i have to configure the nodemon package
// in package.json add "scripts": {
   // "dev": "nodemon index.js",
//  }, under scripts