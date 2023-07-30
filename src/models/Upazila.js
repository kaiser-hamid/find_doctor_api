const mongoose = require("mongoose");

const upazilaSchema = new mongoose.Schema({
    id: Number,
    district_id: Number,
    name: String,
    bn_name: String,
    url: String,
});

module.exports = mongoose.model("Upazila", upazilaSchema);