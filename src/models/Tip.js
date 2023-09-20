const {Schema, model} = require('mongoose')

const tipSchema = new Schema({
    title: Object,
    details: Object,
    status: Boolean
});

module.exports = model("Tip", tipSchema);