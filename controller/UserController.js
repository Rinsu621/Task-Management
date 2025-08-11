const User = require('../models/User');
const bcrypt=require('bcryptjs');
const createToken= require('../createToken');

async function signup(req,res)
{
    const {fullname, email, phone, password} = req.body;
    const user = await User.findOne({email});
    if(user)
    {
        return res.status(400).send({error:"User already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt);
    let newUser= await User.create({fullname, email, phone, password:hashPassword});
    const token= createToken(newUser._id);
    res.send({message:"User Registered",user:newUser });
}

async function login(req,res)
{
    const {email,password} = req.body;
    const user= await User.findOne({email});
    if(!user)
    {
        return res.status(400).send({error:"User not found"});
    }
    const isMatch= await bcrypt.compare(password, user.password);
    if(!isMatch)
    {
        return res.status(400).send({error:"Invalid Password"});
    }
    const token= createToken(user._id);
    res.send({message:"Login Successful",user, token})
}


exports.login = login;
exports.signup = signup;