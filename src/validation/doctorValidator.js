const { body } = require("express-validator");
const uploadedFileValidator = require("./uploadedFileValidator");

module.exports.saveDoctor = [
    body("first_name").trim().escape().notEmpty().withMessage("The first name field is required"),
    body("first_name_bn").trim().escape().notEmpty().withMessage("The first name (bn) field is required"),
    body("last_name").trim().escape().notEmpty().withMessage("The last name field is required"),
    body("last_name_bn").trim().escape().notEmpty().withMessage("The last name (bn) field is required"),
    body("phone").trim().escape().notEmpty().withMessage("The phone field is required"),
    body("email").optional().trim().escape().isEmail().withMessage("The email format is wrong"),
    body("bmdc_reg_no").optional().trim().escape(),
    body("gender").trim().escape().notEmpty().withMessage("The gender field is required").isIn(["male", "female", "others"]).withMessage("The gender field must be male, female or others"),
    body("address").trim().escape().notEmpty().withMessage("The address field is required"),
    body("address_bn").trim().escape().notEmpty().withMessage("The address bn field is required"),
    body("dob").optional().trim().escape().isDate().withMessage("The date of birth field is not a valid date"),
    body("chamber").trim().escape().notEmpty().withMessage("The chamber field is required").isArray().withMessage("The services field must be an array"),
    body("speciality").optional().trim().escape().isArray().withMessage("The speciality field must be an array"),
    body("qualification").optional().trim().escape().isArray().withMessage("The qualification field must be an array"),
    body("education").optional().trim().escape().isArray().withMessage("The education field must be an array"),
    body("experience").optional().trim().escape().isArray().withMessage("The experience field must be an array"),
    body("language").optional().trim().escape().isArray().withMessage("The language field must be an array"),
    body("profile_picture").custom((value, {req}) => uploadedFileValidator(req, "profile_picture", "required|max:2048|mimes:image/jpeg,image/png")),
];

module.exports.updateDoctor = [
    body("name").trim().escape().notEmpty().withMessage("The name field is required"),
    body("name_bn").trim().escape().notEmpty().withMessage("The name_bn field is required"),
    body("phone").trim().escape().notEmpty().withMessage("The phone field is required"),
    body("email").optional().trim().escape().isEmail().withMessage("The email format is wrong"),
    body("website").optional().trim().escape(),
    body("reg_no").optional().trim().escape(),
    body("operating_hours").optional().trim().escape(),
    body("operating_hours_bn").optional().trim().escape(),
    body("est").optional().trim().escape().isDate().withMessage("The est field is not a valid date"),
    body("division_id").trim().escape().notEmpty().withMessage("The division id field is required"),
    body("district_id").trim().escape().notEmpty().withMessage("The district id field is required"),
    body("upazila_id").trim().escape().notEmpty().withMessage("The upazila id field is required"),
    body("address").trim().escape().notEmpty().withMessage("The address field is required"),
    body("address_bn").trim().escape().notEmpty().withMessage("The address bn field is required"),
    body("latitude").trim().escape().notEmpty().withMessage("The latitude field is required").isFloat().withMessage("The latitude field must be a decimal number"),
    body("longitude").trim().escape().notEmpty().withMessage("The longitude field is required").isFloat().withMessage("The longitude field must be a decimal number"),
    body("services").optional().trim().escape().isArray().withMessage("The services field must be an array"),
    body("departments").optional().trim().escape().isArray().withMessage("The departments field must be an array"),
    body("facilities").optional().trim().escape().isArray().withMessage("The facilities field must be an array"),
    body("image").custom((value, {req}) => uploadedFileValidator(req, "image", "max:5120|mimes:image/jpeg,image/png")),
    body("logo").custom((value, {req}) => uploadedFileValidator(req, "logo", "max:5120|mimes:image/jpeg,image/png"))
];


