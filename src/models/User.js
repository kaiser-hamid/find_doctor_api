const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
    phone_no: String,
    profile_picture: String,
    gender: String,
    dob: Date,
    active_status: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model("User", userSchema);