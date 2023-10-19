const mongoose = require("mongoose");

const chamberSchema = new mongoose.Schema({
    name: {type: Object, required: true},
    address: {type: Object, required: true},
    phone: [String],
    email: String,
    website: String,
    division: Object,
    district: Object,
    upazila: Object,
    geo_location: Map,
    services: [String],
    week_days: [String],
    operating_hours: Object,
    logo: String,
    reg_no: String,
    about: Object,
    rating: Number,
    active_status: Number,
    remarks: Object,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

chamberSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model("Chamber", chamberSchema);