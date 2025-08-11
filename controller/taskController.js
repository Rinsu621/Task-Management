const { response } = require('express');
const Task = require('../models/Task');

async function getTask(req,res)
{
    let tasks= await Task.find({user:req.user._id});
    if(tasks.length===0)
    {
        res.send({error:"No Task Added!"});
    }
    else{
    res.send(tasks)
    }
}

async function postTask(req,res)
{
    try{
    let task= await Task.create({...req.body, user:req.user._id});
    res.send({message:"Task Added!",task});
    }
    catch(e)
{
    res.status(400).send({error:"Error adding task"});
}
}

async function editTask(req,res)
{
    const taskID= req.params.id;
    const task= await Task.findByIdAndUpdate(taskID,{
        $set: req.body
    },
    {new:true});
    res.send({message:"Task Updated",task});
}

async function deleteTask(req,res)
{
    const taskID= req.params.id;
    const task= await Task.findByIdAndDelete(taskID);
    res.send({message:"Task Deleted", task});
}

exports.getTask = getTask;
exports.postTask = postTask;
exports.editTask =editTask;
exports.deleteTask=deleteTask;