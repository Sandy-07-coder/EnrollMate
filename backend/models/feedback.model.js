import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        trim: true,
    },
    dept: {
        type: String,
        enum: ["CSE", "EEE", "ECE", "AIML", "AIDS", "MECH", "CIVIL", "AGRI", "MBA"],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    improvement: {
        type: String,
        required: true
    }
})

const feedBack = mongoose.model("FeedBack", feedBackSchema);

export default feedBack;