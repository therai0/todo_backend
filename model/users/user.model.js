// model for registering the user

import mongoose from "mongoose";


const user = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    clientapp: {
        type: String,
        trim: true
    },
    agree: {
        type: Boolean,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

 export const User = mongoose.model("User", user);
// export default User;