const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('../db/connection');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Requests types and access control
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.get("", (req,res,next)=>{
    console.log("Request came");
    res.status(200).json({
        message: "Successfully returned request"
    });
});
module.exports = app;