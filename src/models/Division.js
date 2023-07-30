const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema({
    id: Number,
    name: String,
    bn_name: String,
    url: String,
});

module.exports = mongoose.model("Division", divisionSchema);