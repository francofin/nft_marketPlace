import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
const db = require('./config/connection');
const morgan = require('morgan');
require('dotenv').config();


const app = express();
const csrfProtection = csrf({cookie:true});

const Port = process.env.PORT || 7888;

db.once('open', () => {
    console.log('Mongose Connected')
});


app.use(cors());
app.use(express.json({limit: "5mb"}));
app.use(cookieParser());
app.use(morgan("dev"));



fs.readdirSync('./apiRoutes').map((route) => {
    app.use('/api', require(`./apiRoutes/${route}`))
});

app.use(csrfProtection);


app.get('/api/csrf-token', (req, res) => {
    res.json({csrfToken:req.csrfToken()})
})

app.listen(Port, () => {
    console.log(`Server now Running on Port: ${Port}`)
})
