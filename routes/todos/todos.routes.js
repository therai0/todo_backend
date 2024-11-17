// route that handle all the todos route

import exress from "express";

const Route = exress();

// importing controller
import { createTodo } from "../../controller/todos/todos.controller.js";

Route.route("/create").post(createTodo);


export default Route;