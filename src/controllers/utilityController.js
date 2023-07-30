const Division = require("../models/Division");
const District = require("../models/District");
const Upazila = require("../models/Upazila");
const {responseAPI} = require("../utils/general.util");

module.exports.divisionList = async (req, res) => {
    try{
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
        if(!!divisions.length){
            res.json(responseAPI(true, "Division list", {divisions}));
        }
        res.status(404).json(responseAPI(false, "No data found in database"));
    }catch (e){
        res.status(400).json(responseAPI(false, e.message));
    }
}

module.exports.districtListOverDivision = async (req, res) => {
    try{
        const { divisionID } = req.params;
        const division = await Division.findById(divisionID);
        if(!!division.length){
            throw new Error("No valid division id");
        }
        const division_id = division.id.toString();
        const districts = await District.aggregate([
            {
                $match: {division_id}
            },
            {
                $project: {
                    _id: 0,
                    id: "$id",
                    label: "$name",
                    value: "$_id"
                }
            }
        ]);
        if(!!districts.length){
            res.json(responseAPI(true, "District list", districts));
        }
        res.status(404).json(responseAPI(false, "No data found in database"));
    }catch (e){
        res.status(400).json(responseAPI(false, e.message));
    }
}

module.exports.upazilaListOverDistrict = async (req, res) => {
    try{
        const { districtID } = req.params;
        const district = await District.findById(districtID);
        if(!!district.length){
            throw new Error("No valid district id");
        }
        const district_id = district.id.toString();
        const upazilas = await Upazila.aggregate([
            {
                $match: {district_id}
            },
            {
                $project: {
                    _id: 0,
                    id: "$id",
                    label: "$name",
                    value: "$_id"
                }
            }
        ]);
        if(!!upazilas.length){
            res.json(responseAPI(true, "Upazila list", upazilas));
        }
        res.status(404).json(responseAPI(false, "No data found in database"));
    }catch (e){
        res.status(400).json(responseAPI(false, e.message));
    }
}