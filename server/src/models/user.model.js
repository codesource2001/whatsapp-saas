import mongoose from "mongoose";
import STATUS_TYPE from "../utils/enums.js";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, lowercase: true, minlength: 3, maxlength: 30 },
    lastName: { type: String, required: true, lowercase: true, minlength: 3, maxlength: 30 },
    username: { type: String, required: true, lowercase: true, unique: true, minlength: 6, maxlength: 30 },
    // phoneNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
    phoneNumber: { type: Number, required: true, min: 10, max: 10 },

    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    avatar: { type: String, default: null }, // https://ui-avatars.com/
    status: { type: String, required: true, enum: [STATUS_TYPE.ACTIVE, STATUS_TYPE.INACTIVE, STATUS_TYPE.BLOCK], default: 'active' }, // active  / inactive / block
    lastLogin: Date,
    role: { type: String, required: true, default: "user" },
    permissions: { type: [String] },
    isEmailVerified: { type: Boolean, default: false },
}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);

export default User;
