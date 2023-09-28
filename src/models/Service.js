const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    id: Number,
    name: Object,
    remarks: Object,
    status: Boolean,
});

module.exports = mongoose.model("Service", serviceSchema);