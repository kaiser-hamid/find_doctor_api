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
    active_status: Number
});

module.exports = mongoose.model("User", userSchema);