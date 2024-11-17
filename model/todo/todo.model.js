// model for creating the todo

import mongoose from "mongoose"

const todo = new mongoose.Schema({
    userid: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    title: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },

    description: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    edit: {
        type: Boolean,
        require: true,
        default: true
    },
    status: {
        type: String,
        require: true,
        trim: true,
        enum: ["Pending", "Completed"]
    },
    priority: {
        type: String,
        require: true,
        trim: true,
        enum: ["less", "medium", "high"]
    },
    deadline: {
        type: String,
        require: true
    },
    createat: {
        type: Date,
        require: true,
        default: Date.now()
    }
})

const Todo = mongoose.model("Todo", todo);
export default Todo;