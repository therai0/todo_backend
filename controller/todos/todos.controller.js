// controller for creating editing and deleting Todos

// importing model
import { Todos } from "../../model/todo/todo.model.js";

// function to create the Todos
const createTodo = async (req, res) => {
  try {
    const { userid, title, description, deadline } = req.body;

    await Todos.create({ userid, title, description, deadline }).then(
      (data) => {
        return res
          .status(201)
          .json({ body: data, message: "Todos created successfully" });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// function to delete the Todos
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todos.findByIdAndDelete({ _id: id }).then((data) => {
      if (data) {
        return res.status(200).json({ message: "Todos delete successfully" });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// updating the Todos
const updateTodo = async (req, res) => {
  try {
    const { title, description, deadline, id } = req.body;

    // checkig if req.body elements are empty or not
    if (!title || !description || !deadline) {
      return res
        .status(406)
        .json({ message: "Please enter the require filed" });
    }

    await Todos.findByIdAndUpdate(
      id,
      { title, description, deadline },
      { new: true }
    ).then((data) => {
      return res
        .status(200)
        .json({ message: "Todos update successfully", body: data });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// read all the Todos
const getTodos = async (req, res) => {
  try {
    const { userid } = req.params;

    await Todos.find({ userid: userid }).then((data) => {
      res.status(200).json({
        Todos: data,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { createTodo, deleteTodo, updateTodo, getTodos };
