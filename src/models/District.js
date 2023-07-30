const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
    id: Number,
    division_id: Number,
    name: String,
    bn_name: String,
    lat: Number,
    lon: Number,
    url: String,
});

module.exports = mongoose.model("District", districtSchema);