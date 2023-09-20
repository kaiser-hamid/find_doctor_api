const {responseAPI} = require("../utils/general.util");
const Chamber = require('../models/Chamber');
const Doctor = require('../models/Doctor');
const Tip = require('../models/Tip');
const Testimonial = require('../models/Testimonial');

const {doctorListResource} = require('../resources/doctorResource')

module.exports.homePageInitData = async (req, res) => {
    try {
        const chamber_options = await Chamber.find().select({_id: 0, id: "$_id", label: "$name", value: "$_id"});
        const doctors = await Doctor.find().select({first_name: 1, last_name: 1, speciality: 1, education: 1, profile_picture: 1});
        const popular_doctors = doctorListResource(doctors, true);
        const nearest_chambers = await Chamber.find().select({name: 1, "area": "$upazila.name", operating_hours: 1});
        const tips = await Tip.find({status: true}).select({_id: 0, title: 1, details: 1});
        const testimonials = await Testimonial.find({status: true}).select({_id: 0, name: 1, profession: 1, details: 1});
        const totalDoctores = await Doctor.count();
        const resource = {
            chambers: chamber_options.length,
            doctors: totalDoctores,
        };
        res.json(responseAPI(true, "Division list", { chamber_options, popular_doctors, nearest_chambers, tips, testimonials, resource}));

    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}


