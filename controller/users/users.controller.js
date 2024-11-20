// controller for every avtivites of user

// importing model
import { User } from "../../model/users/user.model.js";

// importing middleware and other helper function
import { generateToken, veriyToken } from "../../middleware/jwt/token.js";
import { generatePassword, isCorrectPassword } from "../../utils/password/password.js";

// creating account
const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const { firstname, lastname, username, email, password, clientapp, isChecked } = req.body;

        // creating new user
        await User.create({ firstname, lastname, username, email, password: generatePassword(password), clientapp, isChecked })
            .then((data) => {
                const { firstname, lastname, username, email, clientapp, _id } = data;

                // generating token
                const token = generateToken({ firstname, lastname, username, email, clientapp, _id });

                // // response token in cookies
                // res.cookie('accessToken', token, {
                //     httpOnly: true,
                //     maxAge: 86400
                // });

                return res.status(201).json({
                    token:token,
                    body: {
                        id: _id,
                        firstname:firstname,
                        lastname:lastname,
                        username:username,
                        email:email,
                    }, message: "User account created successfully"
                });
            })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}


//get the information with userid
const getUserById = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorize access" });
        }
        const verifyToken = veriyToken(token);

        if (verifyToken.valid) {
            await User.findOne({ _id: req.params.id })
                .then((data) => {
                    const { firstname, lastname, username, email, _id } = data;
                    return res.status(200).json({
                        body: {
                            id: _id
                        }
                    })
                })
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ err: err.message });
    }
}


// update the user data by id
const updateUserDataById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const { firstname, lastname } = req.body;
        await User.findByIdAndUpdate(id, { firstname: firstname, lastname: lastname }, { new: true })
            .then((data) => {
                return res.status(200).json({
                    body: {
                        firstname: data.firstname,
                        lastname: data.lastname
                    }, message: "User data update successfully"
                });
            })
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ err: err.message });
    }
}

// delete user byId
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id)
            .then((data) => {
                if (data) {
                    // res.clearCookie('accessToken');
                    return res.status(200).json({ body: {}, message: "User deleted successfully" });
                }
            })
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ err: err.message });
    }
}

// updateUsername
const updateUsername = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.status(401).json({ message: "plesae enter the username" });
        }
        // check the user with same username is avilable or not
        const getUser = await User.find({ username: username });
        if (getUser.length === 0) {
            await User.findByIdAndUpdate(id, { username: username }, { new: true })
                .then(
                    (data) => {
                        const { id, username } = data;
                        return res.status(200).json({ username: username, id: id, message: "Username successfully updated" });
                    });
        } else {
            return res.status(409).json({ message: "This username is already taken" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
}


// updateUserEmail
const updateUserEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        if (!email) {
            return res.status(401).json({ message: "plesae enter the email" });
        }
        // check email is already used or not
        const getUser = await User.find({ email: email });
        if (getUser.length === 0) {
            await User.findByIdAndUpdate(id, { email: email }, { new: true })
                .then((data) => {
                    return res.status(200).json({ message: "Email update successfully", email: data["email"], id: data["id"] });
                });
        }
        else {
            return res.status(409).json({ message: "This email is already used" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
}


// for log in 

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        if (!email || !password) {
            return res.status(406).json({ message: "Please enter the require field" });
        }

        await User.findOne({ email: email.trim() })
            .then((data) => {

                // if no data means there is no user with this email
                if (!data) {
                    return res.status(404).json({ message: "User not found" });
                }

                // checking the password is correct or not
                const checkPassword = isCorrectPassword(data.password, password.trim());
                console.log(checkPassword);
                if (checkPassword) {
                    const { firstname, lastname, username, email, clientapp, _id } = data;

                    // generating token
                    const token = generateToken({ firstname, lastname, username, email, clientapp, _id });

                    // response token in cookies
                    // res.cookie('accessToken', token, {
                    //     httpOnly: true,
                    //     maxAge: 86400
                    // });

                    return res.status(201).json({
                        token:token,
                    body: {
                        id: _id,
                        firstname:firstname,
                        lastname:lastname,
                        username:username,
                        email:email,
                    }, message: "Login successfully"
                    });
                } else {
                    return res.status(401).json({ message: "Incorrect password" });
                }
            })
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export {
    registerUser,
    updateUserDataById,
    getUserById,
    deleteUserById,
    updateUsername,
    updateUserEmail,
    loginUser
};