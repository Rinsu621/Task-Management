const {request}= require('express');
const User = require('../models/User');
const jwt= require('jsonwebtoken');

const checkAuth=async (req, res, next) => 
{
    const { authorization } = req.headers;
    
    if(!authorization)
    {
        return res.status(401).send({error:"You must be logged in."});
    }
    try{
        const token= authorization.replace("Bearer ","");
        const {_id}=jwt.verify(token,process.env.JWT_SECRET);
        const user= await User.findById(_id);
        req.user=user;
        next();

    }
    catch(e)
    {
        return res.status(401).send({error:"Invalid Token."});
    }
}

module.exports = checkAuth;