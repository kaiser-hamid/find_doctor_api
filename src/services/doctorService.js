const he = require('he');
const moment = require("moment");
const {baseURL} = require("../configs/app");
const {responseAPI} = require("../utils/general.util");

//models
const Speciality = require("../models/Speciality");
const Chamber = require("../models/Chamber");
const Designation = require("../models/Designation");

module.exports.doctorDetailsDataProcess = (doctor) => {
    const data = {
        id: doctor._id,
        name: {
            en: `${doctor.first_name?.en} ${doctor.last_name?.en}`,
            bn: `${doctor.first_name?.bn} ${doctor.last_name?.bn}`
        },
        profile_picture: doctor.profile_picture ? baseURL + doctor.profile_picture : null,
        gender: doctor.gender,
        email: doctor.email || null,
        reg_no: doctor.bmdc_reg_no || null,
        experience: doctor.experience || null,
        about_doctor: doctor.about_doctor || null,
        speciality: doctor.speciality,
        degree: doctor.degree,
        designation: doctor.designation,
        total_views: doctor.views,
        rating: doctor.rating,
        chambers: getDoctorChambers(doctor.chamber)
    }
    return data;
}

const getDoctorChambers = (chambers) => {
    if(!chambers){
        return null;
    }
    const data = chambers.map(chamber => {
        return {
            name: chamber.name,
            location: {
                en: `${chamber._id.upazila.name.en}, ${chamber._id.district.name.en}`,
                bn: `${chamber._id.upazila.name.bn}, ${chamber._id.district.name.bn}`,
            },
            coordinates: {
                latitude: chamber._id.geo_location?.get('coordinates')[1],
                longitude: chamber._id.geo_location?.get('coordinates')[0],
            },
            schedule: {
                start: moment("2000-12-31 "+ chamber.schedule.start).format('hh:mma'),
                end: moment("2000-12-31 "+ chamber.schedule.end).format('hh:mma')
            },
            phone: chamber.phone,
            week_days: chamber.week_days,
        };
    });
    return data;

}

module.exports.searchHelperData = async () => {
    try{
        const chamber_options = await Chamber.find().select({_id: 0, id: "$_id", label: "$name.en", value: "$_id"});
        const speciality_options = await Speciality.aggregate([
            {$match: {status: true}},
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    label: "$name.en",
                    value: "$name.en"
                }
            },
            {$sort: {"label.en": 1}}
        ]);
        const designation_options = await Designation.aggregate([
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    label: "$name.en",
                    value: "$name.en"
                }
            },
            {$sort: {"label.en": 1}}
        ]);
        return {chamber_options, designation_options, speciality_options }

    }catch (e) {
        return {chamber_options: null, designation_options: null, speciality_options: null };
    }
}

