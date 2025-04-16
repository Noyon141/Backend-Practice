import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
    },
    email:{
        type: String,
        required: true,
        unique: [true,"Please enter a unique email address"],
        trim: true,
        lowercase: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
    },

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;