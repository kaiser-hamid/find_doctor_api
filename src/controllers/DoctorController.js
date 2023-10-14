const Doctor = require('../models/Doctor');

const {doctorListResource} = require('../resources/doctorResource');
const {doctorDetailsDataProcess} = require('../services/doctorService');
const {responseAPI} = require("../utils/general.util");

module.exports.list = async (req, res) => {
    try {
        const doctors = await Doctor.find().select({
            first_name: 1,
            last_name: 1,
            degree: 1,
            designation: 1,
            profile_picture: 1
        });
        if (!doctors.length) {
            throw new Error("No record found");
        }
        const doctorsApiData = doctorListResource(doctors, true);
        res.json(responseAPI(true, "Doctor list", doctorsApiData));

    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

module.exports.details = async (req, res) => {
    try {
        const {id} = req.params;
        const doctor = await Doctor.findById(id).populate({path: 'chamber._id', model: 'Chamber', select: {_id: 0, upazila: 1, district: 1, geo_location: 1}});
        // res.json(responseAPI(true, "Doctor details", doctor));
        // return
        if (!doctor) {
            throw new Error("No record found");
        }
        const doctorApiData = doctorDetailsDataProcess(doctor);
        res.json(responseAPI(true, "Doctor details", doctorApiData));

    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}


