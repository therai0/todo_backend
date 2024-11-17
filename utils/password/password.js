

import bcrypt from  "bcrypt";

const generatePassword = (password)=> {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
    return bcrypt.hashSync(password,salt);
}

const isCorrectPassword = (hashPassword,password)=> {
    return bcrypt.compareSync(password,hashPassword);
}

export {generatePassword,isCorrectPassword};