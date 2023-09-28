const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema({
    id: Number,
    name: Object,
    remarks: Object,
    status: Boolean,
});

module.exports = mongoose.model("Speciality", specialitySchema);