// this file helps to connect the project with database


import mongoose from "mongoose";

const connectDB = async () => {
    try {

        await mongoose.connect(`${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`);
        console.log("Connect to database");
    }
    catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

export default connectDB;