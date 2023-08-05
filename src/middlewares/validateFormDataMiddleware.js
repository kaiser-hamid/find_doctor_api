const {responseAPI, validate, parseFirstErrorMsg} = require("../utils/general.util");
const {removeTempUploadedUnusedFiles} = require("../utils/fileHandler.util");


module.exports = (req, res, next) => {
    try{
        const errors = validate(req);
        if (errors) {
            removeTempUploadedUnusedFiles(req);
            res.json(responseAPI(false, parseFirstErrorMsg(errors), [], errors));
        }else {
            next();
        }
    }catch (e) {
        res.status(400).json(responseAPI(false, e.message));
    }
}