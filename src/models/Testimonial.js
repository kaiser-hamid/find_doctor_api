const {Schema, model} = require('mongoose')

const testimonialSchema = new Schema({
    name: Object,
    profession: Object,
    details: Object,
    status: Boolean
});

module.exports = model("Testimonial", testimonialSchema);