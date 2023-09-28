const { body } = require("express-validator");
const uploadedFileValidator = require("./uploadedFileValidator");

module.exports.saveChamber = [
    body("name").trim().escape().notEmpty().withMessage("The name field is required"),
    body("name_bn").trim().escape().notEmpty().withMessage("The name_bn field is required"),
    body("phone").trim().escape().notEmpty().withMessage("The phone field is required"),
    body("email").optional().trim().escape().isEmail().withMessage("The email format is wrong"),
    body("website").optional().trim().escape(),
    body("reg_no").optional().trim().escape(),
    body("operating_hours").optional().trim().escape(),
    body("operating_hours_bn").optional().trim().escape(),
    body("division_id").trim().escape().notEmpty().withMessage("The division id field is required"),
    body("district_id").trim().escape().notEmpty().withMessage("The district id field is required"),
    body("upazila_id").trim().escape().notEmpty().withMessage("The upazila id field is required"),
    body("address").trim().escape().notEmpty().withMessage("The address field is required"),
    body("address_bn").trim().escape().notEmpty().withMessage("The address bn field is required"),
    body("latitude").trim().escape().notEmpty().withMessage("The latitude field is required").isFloat().withMessage("The latitude field must be a decimal number"),
    body("longitude").trim().escape().notEmpty().withMessage("The longitude field is required").isFloat().withMessage("The longitude field must be a decimal number"),
    body("week_days").trim().escape().isArray().withMessage("The week days field must be an array"),
    body("services").optional().trim().escape().isArray().withMessage("The services field must be an array"),
    body("logo").custom((value, {req}) => uploadedFileValidator(req, "logo", "max:5120|mimes:image/jpeg,image/png"))
];

module.exports.updateChamber = [
    body("name").trim().escape().notEmpty().withMessage("The name field is required"),
    body("name_bn").trim().escape().notEmpty().withMessage("The name_bn field is required"),
    body("phone").trim().escape().notEmpty().withMessage("The phone field is required"),
    body("email").optional().trim().escape().isEmail().withMessage("The email format is wrong"),
    body("website").optional().trim().escape(),
    body("reg_no").optional().trim().escape(),
    body("operating_hours").optional().trim().escape(),
    body("operating_hours_bn").optional().trim().escape(),
    body("division_id").trim().escape().notEmpty().withMessage("The division id field is required"),
    body("district_id").trim().escape().notEmpty().withMessage("The district id field is required"),
    body("upazila_id").trim().escape().notEmpty().withMessage("The upazila id field is required"),
    body("address").trim().escape().notEmpty().withMessage("The address field is required"),
    body("address_bn").trim().escape().notEmpty().withMessage("The address bn field is required"),
    body("latitude").trim().escape().notEmpty().withMessage("The latitude field is required").isFloat().withMessage("The latitude field must be a decimal number"),
    body("longitude").trim().escape().notEmpty().withMessage("The longitude field is required").isFloat().withMessage("The longitude field must be a decimal number"),
    body("week_days").trim().escape().isArray().withMessage("The week days field must be an array"),
    body("services").optional().trim().escape().isArray().withMessage("The services field must be an array"),
    body("logo").custom((value, {req}) => uploadedFileValidator(req, "logo", "max:5120|mimes:image/jpeg,image/png"))
];


