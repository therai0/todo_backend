// this is the file which helps to generate the token and very the token

import jwt from "jsonwebtoken";

const generateToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY);
}

const veriyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        if (decoded) {
            return { valid: true, data: decoded };
        }
    }
    catch (err) {
        console.log(err.message);
        return { valid: false };
    }
}

export {generateToken,veriyToken};