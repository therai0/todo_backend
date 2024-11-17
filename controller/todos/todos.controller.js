// controller for creating editing and deleting todo

// importing model
import Todo from "../../model/todo/todo.model.js";

// function to create the todo
const createTodo = async (req, res) => {
    try {
        const { userid, email, title, description, status, priority, deadline } = req.body;

        await Todo.create({ userid, email, title, description, status, priority, deadline })
            .then((data) => {
                    return res.status(201).json({body:data});
            })
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


// function to delete the todo
const deleteTodo = (req,res)=> {

}
export {createTodo,deleteTodo};