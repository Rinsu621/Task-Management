const express = require('express');
const { getTask, postTask, editTask, deleteTask } = require('../controller/taskController');
const checkAuth = require('../middleware/checkAuth');
const taskRouter = express.Router();

taskRouter.get("/",checkAuth,getTask);
taskRouter.post("/",checkAuth,postTask);
taskRouter.put("/:id",editTask);
taskRouter.delete("/:id",deleteTask);

module.exports= taskRouter;