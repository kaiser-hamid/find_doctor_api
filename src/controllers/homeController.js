const {responseAPI} = require("../utils/general.util");
const Chamber = require('../models/Chamber');
const Speciality = require('../models/Speciality');
const Doctor = require('../models/Doctor');
const Tip = require('../models/Tip');
const Testimonial = require('../models/Testimonial');

const {doctorListResource} = require('../resources/doctorResource')
const {chamberListResource} = require("../resources/chamberResource");

module.exports.homePageInitData = async (req, res) => {
    try {
        const chamber_options = await Chamber.find().select({_id: 0, id: "$_id", label: "$name", value: "$_id"});
        const speciality_options = await Speciality.aggregate([
            {$match: {status: true}},
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    label: "$name",
                    value: "$name.en"
                }
            }
        ]);
        const doctors = await Doctor.aggregate([
            {
                $project: {
                    full_name_en: {$concat : ["$first_name.en", " ", "$last_name.en"]},
                    full_name_bn: {$concat : ["$first_name.bn", " ", "$last_name.bn"]},
                    degree: 1,
                    designation: 1,
                    profile_picture: 1,
                }
            },
            {$sort: {full_name_en: 1}},
            {$limit: 5}
        ]);
        const popular_categories =  await Speciality.find().select({_id: 0, name: 1}).limit(8);
        const popular_doctors = doctorListResource(doctors, true);
        const chambers = await Chamber.find().limit(5);
        const tips = await Tip.find({status: true}).select({_id: 0, title: 1, details: 1});
        const testimonials = await Testimonial.find({status: true}).select({_id: 0, name: 1, profession: 1, details: 1});
        const totalDoctores = await Doctor.count();
        const nearest_chambers = chamberListResource(chambers, true);
        const resource = {
            chambers: chamber_options.length,
            doctors: totalDoctores,
        };
        res.json(responseAPI(true, "Division list", { popular_doctors, nearest_chambers, popular_categories, tips, testimonials, resource, chamber_options, speciality_options}));

    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}


