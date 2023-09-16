const {Schema, model} = require('mongoose')

const tipSchema = new Schema({
    title: String,
    details: String,
    status: Boolean
});

module.exports = model("Tip", tipSchema);