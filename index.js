import dotenv from "dotenv";
import connectDB from "./database/index.js";

import app from "./app.js";


// configuring the path of env file
dotenv.config(
    {
        path: "../.env"
    }
)

// checking the connecting with database
connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App is running app port ${process.env.PORT}`);
        });
    })

