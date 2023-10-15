const Mongoose = require("mongoose");
const Doctor = require('../models/Doctor');

const {doctorListResource} = require('../resources/doctorResource');
const {doctorDetailsDataProcess, searchHelperData} = require('../services/doctorService');
const {responseAPI} = require("../utils/general.util");

module.exports.searchFormHelperData = async (req, res) => {
    try {
        const data = await searchHelperData();
        res.json(responseAPI(true, "Form data", data));
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

module.exports.list = async (req, res) => {
    try {
        const {name, chamber, speciality} = req.query;
        let matchStage = {
            $or: []
        };
        if (name) {
            matchStage.$or.push({ full_name_en: { $regex: `.*${name}.*`, $options: "i" } });
            matchStage.$or.push({ full_name_bn: { $regex: `.*${name}.*`, $options: "i" } });
        }
        if (chamber) {
            matchStage.chamber = new Mongoose.Types.ObjectId(chamber);
        }
        if (speciality) {
            matchStage.speciality = speciality;
        }
        if (Object.keys(matchStage.$or).length === 0) {
            delete matchStage.$or;
        }
        if (Object.keys(matchStage).length === 0) {
            matchStage = {};
        }
        const doctors = await Doctor.aggregate([
            {
                $project: {
                    full_name_en: {$concat : ["$first_name.en", " ", "$last_name.en"]},
                    full_name_bn: {$concat : ["$first_name.bn", " ", "$last_name.bn"]},
                    degree: 1,
                    designation: 1,
                    profile_picture: 1,
                    speciality: 1,
                    chamber: "$chamber._id",
                }
            },
            { $match: matchStage },
            {$sort: {full_name_en: 1}}
        ]);
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


