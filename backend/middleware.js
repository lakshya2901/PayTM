const express = require('express');
// const {userId, token}  = require("./routes/user");      
const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

const app = express();

const authMiddleware = (req, res, next)=>{
    const authMiddlewareHeader = req.headers.authorization;

    if(!authMiddlewareHeader || !authMiddlewareHeader.startsWith("Bearer")){
        return res.status(403).json({});
    }
    const token = authMiddlewareHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId
            next();
        } else{
            return res.status(411).json({})
        }
    }
    catch (error){
        return res.status(411).json({
            message: error,
        })
    }
    
}   

module.exports = {
    authMiddleware
}
