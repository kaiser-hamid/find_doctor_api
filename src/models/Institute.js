const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
    id: Number,
    name: Object,
    address: Object,
    status: Boolean,
});

module.exports = mongoose.model("Institute", instituteSchema);