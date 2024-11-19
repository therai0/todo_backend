//middleware for handling the data validation like empty data
// if other todo may exist with same title

import { get } from "mongoose";
import { Todos } from "../../model/todo/todo.model.js";
import { User } from "../../model/users/user.model.js";

// function to validate the deadline
const validateDeadLine = (date) => {
  try {
    // this lines will split the date into array
    const [datepart, timepart, PMorAM] = date.split("_");

    const [year, month, day] = datepart.split("/");
    const [hours, minutes] = timepart.split(":");

    // getting the current date and comparing with user input date
    const currentDate = new Date();
    const newDate = new Date(year, month, day, hours, minutes);

    // if deadline is smaller then current date then it will  return new message;
    if (currentDate < newDate) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// when user submit the data for creating todo
//  along with todo data they also submit user id and email
//  check the that particular email and user id is exist in database or not(in case if some body submit wrong userid and email address)
const validateUserid = async (userid) => {
  try {
    // fetching all the user data from the database
    const getUser = await User.findById({ _id: userid });
    if (getUser) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

// validating the user input data
const validateData = async (req, res, next) => {
  try {
    const { userid, title, description, deadline } = req.body;

    //    checking that every field is fill or not
    if (!userid || !title || !description || !deadline) {
      return res.status(406).json({ message: "Please enter the require field" });
    }

    // deadline is validate or not
    if (!validateDeadLine(deadline)) {
      return res.status(400).json({ message: "Deadline is not valid" });
    }

    // validating the user id
    const isValidUser = await validateUserid(userid);
    console.log(isValidUser);
    if (!isValidUser) {
      return res.status(401).json({ message: "User is not varified" });
    }

    // check the if the same todo exist with same id in database or not
    await Todos.find({ userid: userid }).then((data) => {
      if (data) {
        // looping over the arrays of todo
        for (let i = 0; i < data.length; i++) {
          if (
            title.trim().toLowerCase() === data[i].title.toLocaleLowerCase()
          ) {
            return res
              .status(409)
              .json({ message: "This todo title is already exist" });
          }
        }
      }
      // it transfer the request to next function
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//
export default validateData;
