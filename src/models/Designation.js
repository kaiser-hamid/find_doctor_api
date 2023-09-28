const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
    id: Number,
    name: Object,
    remarks: Object,
    status: Boolean,
});

module.exports = mongoose.model("Designation", designationSchema);