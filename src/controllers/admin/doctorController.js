const ObjectId = require('mongoose').Types.ObjectId;
const {responseAPI, validate, parseFirstErrorMsg} = require("../../utils/general.util");
const Division = require("../../models/Division");
const District = require("../../models/District");
const Upazila = require("../../models/Upazila");
const Chamber = require("../../models/Chamber")
const Doctor = require("../../models/Doctor")
const {removeTempUploadedUnusedFiles, removeUserFiles} = require("../../utils/fileHandler.util");
const {baseURL} = require("../../configs/app");
const {doctorListResource} = require("../../resources/admin/doctorResource");
const mongoose = require("mongoose");
const {saveDoctorDataProcess, doctorRemovableFiles, prepareEditFormData, updateDoctorDataProcess,
    updateDoctorChamberDataProcess, prepareChamberAssignFormData
} = require("../../services/admin/doctorService");

module.exports.doctors = async (req, res) => {
    try {
        const chambers = await Doctor.find().select({
            first_name: 1,
            last_name: 1,
            profile_picture: 1,
            phone: 1,
            email: 1,
            address: 1,
            bmdc_reg_no: 1,
            speciality: 1,
            chamber: 1,
        });
        if (chambers.length) {
            res.json(responseAPI(true, "Doctor list", doctorListResource(chambers, true)));
        } else {
            res.json(responseAPI(true, "No doctors found"));
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//save
module.exports.saveDoctor = async (req, res) => {
    try {
        const data = await saveDoctorDataProcess(req);
        const newDoctor = new Doctor(data);
        const result = await newDoctor.save();
        if (result) {
            res.json(responseAPI(true, "Doctor has been saved successfully"));
        } else {
            res.json(responseAPI(false, "Data cannot be saved"));
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

module.exports.editFormHelperData = async (req, res) => {
    try {
        const {id} = req.params;
        const doctor = await Doctor.findById(id);
        if(!doctor){
            throw new Error("No record found");
        }
        const data = prepareEditFormData(doctor);
        res.json(responseAPI(true, "Chamber record", { data }));
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//update
module.exports.updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id);
        if(!doctor){
            throw new Error("No record found");
        }
        const {data, deleteableFilePaths} = await updateDoctorDataProcess(req, doctor);
        const result = await Doctor.findByIdAndUpdate(id, data);
        if (result) {
            if(deleteableFilePaths.length){
               removeUserFiles(deleteableFilePaths);
            }
            res.json(responseAPI(true, "Doctor has been saved successfully"));
        } else {
            throw new Error("Data cannot be updated");
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//remove
module.exports.removeDoctor = async (req, res) => {
    try {
        const {id} = req.params;
        const doctor = await Doctor.findById(id);
        const removableFiles = doctorRemovableFiles(doctor);
        removeUserFiles(removableFiles);
        const result = doctor.deleteOne();
        if (result) {
            res.json(responseAPI(true, "Item removed"));
        } else {
            res.status(400).json(responseAPI(false, "Cannot remove the item right now"));
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//Assign chamber
module.exports.doctorChamberUpdate = async (req, res) => {

    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id);
        if(!doctor){
            throw new Error("No record found");
        }
        const data = await updateDoctorChamberDataProcess(req);
        doctor.chamber = data;
        const result = await doctor.save();
        if (result) {
            res.json(responseAPI(true, "Chambers have been assigned successfully"));
        } else {
            throw new Error("Data cannot be updated");
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//form helper
// module.exports.addFormHelperData = async (req, res) => {
//     try {
//         const chambers = await Chamber.aggregate([{ $project: { _id: 0, id: "$_id", label: "$name.en", value: "$_id"}}]);
//         if (!!chambers.length) {
//             res.json(responseAPI(true, "Chamber list", {chambers}));
//         } else {
//             res.status(404).json(responseAPI(false, "No data found in database"));
//         }
//     } catch (e) {
//         res.status(400).json(responseAPI(false, e.message));
//     }
// }

module.exports.assignChamberFormData = async (req, res) => {
    try {
        const {id} = req.params;
        const chambers = await Chamber.aggregate([{ $project: { _id: 0, id: "$_id", label: "$name.en", value: "$_id", sub: "$upazila.name.en"}}]);
        if(!chambers.length){
            throw new Error("No chamber found!");
        }
        const doctor = await Doctor.findById(id);
        if(!doctor){
            throw new Error("No record found!");
        }
        const doctor_chamber = prepareChamberAssignFormData(doctor.chamber);
        const doctor_name = `${doctor.first_name?.en} ${doctor.last_name?.en}`;
        res.json(responseAPI(true, "Chamber list", {doctor_name, doctor_chamber, chambers}));
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}
