const mongoose= require('mongoose');

const taskSchema= new mongoose.Schema
({
    title:{
        type: String,
        required: true,
        trim: true
    },

    description:{
        type: String,
        required: true
    },

    status:{
        type: String,
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: false,
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
   
});
const Task= mongoose.model('Task',taskSchema);

module.exports = Task;