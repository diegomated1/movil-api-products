// IMPORTS
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
const app = express();

// CONFIG
dotenv.config();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

// ROUTER
import userRouter from './router/user.router.js';
import productRouter from './router/product.router.js';
import imgRouter from './router/image.router.js';
app.use(userRouter);
app.use(productRouter);
app.use(imgRouter);

// LISTEN
app.listen(parseInt(process.env.API_PORT!), process.env.API_HOST!, ()=>{
    console.log(`Listen on http://${process.env.API_HOST}:${process.env.API_PORT}/`);
});