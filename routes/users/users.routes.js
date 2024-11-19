
import express from "express";
const Route = express();

// importing all the controller method
import { 
    registerUser,
    getUserById,
    updateUserDataById,
    deleteUserById,
    updateUserEmail,
    updateUsername,
    loginUser
 } from "../../controller/users/users.controller.js";



// middleware
import dataverificaton from "../../middleware/datas/datavarification.middleware.js";


// register route with dataverification middleware
Route.route("/create").post(dataverificaton,registerUser);
Route.route("/user/:id").get(getUserById);
Route.route("/update/:id").post(updateUserDataById);
Route.route("/delete/:id").post(deleteUserById);
Route.route("/update/email/:id").post(updateUserEmail);
Route.route("/update/username/:id").post(updateUsername);
Route.route("/login").post(loginUser);

export default Route;