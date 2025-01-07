const HttpError = require("../models/htttp-error");
const jwt = require('jsonwebtoken')
require("dotenv").config();

const PRIVATE_KEY = process.env.TOKEN_PRIVATE;

module.exports = (req,res,next)=>{

    if(req.methods === 'OPTIONS'){
        next()
    }

    try{
        const token = req.headers.authorization(' ')[1];
        if(!token){
            throw new Error("Authentication Failed")
        }

        const decodedToken = jwt.verify(token , PRIVATE_KEY )

        req.userData = {userId : decodedToken.userId}

        next()
    }
    catch(e){
        const err = new HttpError("Authentication Failed",401)
        return next(err)
    }
}