const mongoose = require("mongoose");

const chamberSchema = new mongoose.Schema({
    name: {type: Object, required: true},
    address: {type: Object, required: true},
    phone: String,
    email: String,
    website: String,
    geo_location: Map,
    services: Object,
    departments: Object,
    facilities: Object,
    operating_hours: String,
    est: Date,
    image: String,
    logo: String,
    reg_no: String,
    rating: Number,
    active_status: Number,
    remarks: Object,
});

module.exports = mongoose.model("Chamber", chamberSchema);