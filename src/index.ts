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

// LISTEN
app.listen(parseInt(process.env.API_PORT!), process.env.API_HOST!, ()=>{
    console.log(`Listen on http://${process.env.API_HOST}:${process.env.API_PORT}/`);
});