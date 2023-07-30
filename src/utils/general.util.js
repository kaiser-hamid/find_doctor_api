const {validationResult} = require("express-validator");
module.exports.responseAPI = (status = false, msg = "", data = null, errors = null) => {
    return {status, msg, data, errors}
}

module.exports.validate = (req) => {
    const customValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                [error.path]: error.msg
            }
        }
    });
    const result = customValidationResult(req);
    return result.isEmpty() ? null : result.array();
}

module.exports.parseFirstErrorMsg = (errors) => {
    return errors.length ? Object.values(errors[0])[0] : "Form validation error!";
}
