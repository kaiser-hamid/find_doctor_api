const {responseAPI, validate, parseFirstErrorMsg} = require("../../utils/general.util");
const Division = require("../../models/Division");
const Chamber = require("../../models/Chamber")
const {addChamberDataProcess, saveChamberDataProcess} = require("../../services/admin/chamberService");
const {removeTempUploadedUnusedFiles} = require("../../utils/fileHandler.util");
const {baseURL} = require("../../configs/app");
const {chamberListResource} = require("../../resources/admin/chamberResource");

module.exports.chambers = async (req, res) => {
    try{
        const chambers = await Chamber.find().select({name: 1, logo: 1, address: 1, phone: 1, email: 1, website: 1, operating_hours: 1});
        if(chambers.length){
            res.json(responseAPI(true, "Chamber list", chamberListResource(chambers, true)));
        }else{
            res.json(responseAPI(true, "No chambers found"));
        }
    }catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//save
module.exports.saveChamber = async (req, res) => {
    try {
        const errors = validate(req);
        if(errors){
            removeTempUploadedUnusedFiles(req);
            res.json(responseAPI(false, parseFirstErrorMsg(errors), [], errors))
        }
        const data = await saveChamberDataProcess(req);
        console.log("db_data", data)
        const newChamber = new Chamber(data);
        const result = await newChamber.save();
        if (result) {
            res.json(responseAPI(true, "Chamber has been saved successfully"));
        }else{
            res.json(responseAPI(false, "Data cannot be saved"));
        }
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}

//remove
module.exports.removeChamber = async (req, res) => {
    try{
        const {id} = req.params;
        const result = await Chamber.findByIdAndDelete(id);
        if(result){
            res.json(responseAPI(true, "Item removed"));
        }else{
            res.status(400).json(responseAPI(false, "Cannot remove the item right now"));
        }
    }catch (e) {
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
        }
        res.status(404).json(responseAPI(false, "No data found in database"));
    } catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}