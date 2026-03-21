import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, min: 3, max: 30 },
    lastName: { type: String, required: true, min: 3, max: 30 },
    username: { type: String, required: true, unique: true, min: 6, max: 30 },
    phoneNumber: { type: String, required: true, min: 10, max: 10 },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100
    },
    avatar: String,
    status: { type: String, required: true, default: 'active' },
    lastLogin: Date,
    role: { type: String, required: true, default: "user" },
    permissions: { type: [String] },
    isEmailVerified: { type: Boolean, default: false },
}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);

export default User;
