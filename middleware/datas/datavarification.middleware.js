// verifing the data like correct user input or not
// checking the email and username which may exist again user want to create new accout with same username and email

// importing
import { User } from "../../model/users/user.model.js";


// function which helps to verify the all user input
const dataVerification = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { firstname, lastname, username, email, password, clientapp, isChecked } = req.body;

        //checking if user input empyt fields or not
        if (!firstname || !lastname || !username || !email || !password || !clientapp || !isChecked) {
            return res.status(400).json({ message: "Please fill the require field" });
        }

        // check if email is already used or not
        const userWithThisEmail = await User.findOne({ email: email });
        if (userWithThisEmail) {
            // console.log(userWithThisEmail);
            return res.status(409).json({ message: "This email is already used" });
        }

        // check if this user name is already taken or not
        const userWithThisUsername = await User.findOne({ username: username });
        if (userWithThisUsername) {
            return res.status(409).json({ message: "This username is already taken" });
        }

        // moving to next step
        next();
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
}

export default dataVerification;