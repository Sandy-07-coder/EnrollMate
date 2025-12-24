import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import courseSchedule from "./routers/courseSchedule.route.js"

dotenv.config();

const app = express();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;
const frontendURL = process.env.FRONT_END_URL;

app.use(cors({ origin: frontendURL }));
app.use(express.json());


app.use("/api/courses", courseSchedule);

mongoose.connect(mongoURI, {
}).then(() => {
    console.log("Database connection established");
}).catch((err) => {
    console.log("Database connection failed" + err);
});

app.listen(port,"0.0.0.0", () => {
    console.log(`server running on port ${port}`);
});
