// route that handle all the todos route

import exress from "express";

const Route = exress();

// importing controller
import {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo
} from "../../controller/todos/todos.controller.js";


// importing middleware 
import validateData from "../../middleware/todos/datavalidation.middleware.js";

// router for specific method 
Route.route("/create").post(validateData,createTodo);
Route.route("/update").post(updateTodo);
Route.route("/delete/:id").delete(deleteTodo);
Route.route("/:userid").get(getTodos);


export default Route;