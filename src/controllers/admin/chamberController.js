const ObjectId = require('mongoose').Types.ObjectId;
const {responseAPI, validate, parseFirstErrorMsg} = require("../../utils/general.util");
const Division = require("../../models/Division");
const District = require("../../models/District");
const Upazila = require("../../models/Upazila");
const Chamber = require("../../models/Chamber")
const {
    addChamberDataProcess,
    saveChamberDataProcess,
    chamberRemovableFiles, prepareEditFormData, updateChamberDataProcess
} = require("../../services/admin/chamberService");
const {removeTempUploadedUnusedFiles, removeUserFiles} = require("../../utils/fileHandler.util");
const {baseURL} = require("../../configs/app");
const {chamberListResource} = require("../../resources/admin/chamberResource");
const mongoose = require("mongoose");

module.exports.chambers = async (req, res) => {
    try {
        const chambers = await Chamber.find().select({
            name: 1,
            logo: 1,
            address: 1,
            phone: 1,
            email: 1,
            website: 1,
            operating_hours: 1
        });
        if (chambers.length) {
            res.json(responseAPI(true, "Chamber list", chamberListResource(chambers, true)));
        } else {
            res.json(responseAPI(true, "No chambers found"));
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//save
module.exports.saveChamber = async (req, res) => {
    try {
        const data = await saveChamberDataProcess(req);
        const newChamber = new Chamber(data);
        const result = await newChamber.save();
        if (result) {
            res.json(responseAPI(true, "Chamber has been saved successfully"));
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
        const chamber = await Chamber.findById(id);
        if(!chamber){
            throw new Error("No record found");
        }
        const divisions = await Division.aggregate([{
            $project: { _id: 0, id: "$id", label: "$name", value: "$_id" }
        }]);
        if(!divisions.length){
            throw new Error("Failed to load division");
        }
        const districts = await District.aggregate([
            {
                $match: { _id: chamber.district?._id}
            },
            {
                $project: { _id: 0, id: "$id", label: "$name", value: "$_id" }
            }
        ]);
        if(!districts.length){
            throw new Error("Failed to load district");
        }
        const upazilas = await Upazila.aggregate([
            {
                $match: { _id: chamber.upazila?._id}
            },
            {
                $project: { _id: 0, id: "$id", label: "$name", value: "$_id" }
            }
        ]);
        if(!upazilas.length){
            throw new Error("Failed to load area");
        }
        const data = prepareEditFormData(chamber);
        res.json(responseAPI(true, "Chamber record", {data, divisions, districts, upazilas}));
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//update
module.exports.updateChamber = async (req, res) => {
    try {
        const { id } = req.params;
        const chamber = await Chamber.findById(id);
        if(!chamber){
            throw new Error("No record found");
        }
        const {data, deleteableFilePaths} = await updateChamberDataProcess(req, chamber);
        const result = await Chamber.findByIdAndUpdate(id, data);
        if (result) {
            if(deleteableFilePaths.length){
               removeUserFiles(deleteableFilePaths);
            }
            res.json(responseAPI(true, "Chamber has been saved successfully"));
        } else {
            throw new Error("Data cannot be updated");
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//remove
module.exports.removeChamber = async (req, res) => {
    try {
        const {id} = req.params;
        const chamber = await Chamber.findById(id);
        const removableFiles = chamberRemovableFiles(chamber);
        removeUserFiles(removableFiles);
        const result = chamber.deleteOne();
        if (result) {
            res.json(responseAPI(true, "Item removed"));
        } else {
            res.status(400).json(responseAPI(false, "Cannot remove the item right now"));
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//form helper
module.exports.addFormHelperData = async (req, res) => {
    try {
        const divisions = await Division.aggregate([
            {
                $project: {
                    _id: 0,
                    id: "$id",
                    label: "$name",
                    value: "$_id"
                }
            }
        ]);
        if (!!divisions.length) {
            res.json(responseAPI(true, "Division list", {divisions}));
        } else {
            res.status(404).json(responseAPI(false, "No data found in database"));
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}
