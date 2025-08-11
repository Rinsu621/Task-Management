const express= require('express');
const mongoose= require('mongoose');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
require("dotenv").config();
const app=express();
app.use(express.json());

mongoose.connect(process.env.MONGODB) //connect node and mongodb
.then(()=>console.log("Connected to MongoDB"))
.catch(()=>console.log(e.message));

app.use("/api/users",userRouter);
app.use("/api/tasks",taskRouter);

app.listen(3001,()=>console.log("Server listening on 3001"));