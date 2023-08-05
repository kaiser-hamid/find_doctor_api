const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    first_name: {type: Object, required: true},
    last_name: {type: Object, required: true},
    phone: String,
    email: String,
    profile_picture: String,
    gender: String,
    dob: Date,
    address: Object,
    bmdc_reg_no: String,
    speciality: Object,
    qualifications: Object,
    education: Object,
    experience: Object,
    chamber: Object,
    language: String,
    rating: Number,
    active_status: Number,
    remarks: Object,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

doctorSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model("Doctor", doctorSchema);