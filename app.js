import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


// handling cors origin
app.use(cors());

app.use(express.json());
app.use(urlencoded({ extended: true }));


// middleware to parse the cookies
app.use(cookieParser())

// importing route for users
import registerUser from "./routes/users/users.routes.js";
import getUserById from "./routes/users/users.routes.js";
import updateUserDataById from "./routes/users/users.routes.js";
import deleteUserById from "./routes/users/users.routes.js";
import updateUserEmail from "./routes/users/users.routes.js";
import updateUsername from "./routes/users/users.routes.js";
import loginUser from "./routes/users/users.routes.js";




// importing route for todo
import createTodo from "./routes/todos/todos.routes.js"
import deleteTodo from "./routes/todos/todos.routes.js"
import updateTodo from "./routes/todos/todos.routes.js"
import getTodos from "./routes/todos/todos.routes.js"



// for registering the user route
app.use("/api", registerUser);
app.use("/api", getUserById);
app.use("/api", updateUserDataById);
app.use("/api", deleteUserById);
app.use("/api", updateUserEmail);
app.use("/api", updateUsername);
app.use("/api/auth", loginUser);



// for creating todo 
app.use("/api/todo", createTodo);
app.use("/api/todo", deleteTodo);
app.use("/api/todo", updateTodo);
app.use("/api/todo", getTodos);

export default app;