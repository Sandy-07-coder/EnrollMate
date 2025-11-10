import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        required: true,
    },
    time: {
        type: String,
        enum: ["8-10", "10-12", "1-3", "3-5"],
        required: true,
    },
});

const courseScheduleSchema = new mongoose.Schema(
    {
        uniqueId: {
            type: String,
            required: true,
            unique: true, // ensures each offering is unique
            trim: true,
        },
        courseName: {
            type: String,
            required: true,
            trim: true,
        },
        displayName: {
            type: String,
            required: true,
            trim: true
        },
        staff: {
            type: String,
            required: true,
            trim: true,
        },
        credits: {
            type: Number,
            required: true,
        },
        slots: {
            type: [slotSchema],
            required: true,
            validate: {
                validator: (slots) => slots.length > 0,
                message: "At least one time slot must be assigned",
            },
        },
    },
    { timestamps: true }
);


const CourseSchedule = mongoose.model("CourseSchedule", courseScheduleSchema);

export default CourseSchedule;
