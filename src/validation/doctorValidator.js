const {body} = require("express-validator");
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
    body("dob").optional().trim().escape().isDate().withMessage("The date of birth field is not a valid date"),
    body("address").trim().escape().notEmpty().withMessage("The address field is required"),
    body("address_bn").trim().escape().notEmpty().withMessage("The address bn field is required"),
    body("about_doctor").trim().escape().notEmpty().withMessage("The about doctor field is required"),
    body("about_doctor_bn").trim().escape().notEmpty().withMessage("The about doctor bn field is required"),
    body("experience").trim().escape().notEmpty().withMessage("The experience field is required"),
    body("experience_bn").trim().escape().notEmpty().withMessage("The experience bn field is required"),
    body("speciality").optional().trim().escape().isArray().withMessage("The speciality field must be an array"),
    body("qualification").optional().trim().escape().isArray().withMessage("The qualification field must be an array"),
    body("education").optional().trim().escape().isArray().withMessage("The education field must be an array"),
    body("language").optional().trim().escape().isArray().withMessage("The language field must be an array"),
    body("profile_picture").custom((value, {req}) => uploadedFileValidator(req, "profile_picture", "required|max:2048|mimes:image/jpeg,image/png")),
];

module.exports.updateDoctor = [
    body("first_name").trim().escape().notEmpty().withMessage("The first name field is required"),
    body("first_name_bn").trim().escape().notEmpty().withMessage("The first name (bn) field is required"),
    body("last_name").trim().escape().notEmpty().withMessage("The last name field is required"),
    body("last_name_bn").trim().escape().notEmpty().withMessage("The last name (bn) field is required"),
    body("phone").trim().escape().notEmpty().withMessage("The phone field is required"),
    body("email").optional().trim().escape().isEmail().withMessage("The email format is wrong"),
    body("bmdc_reg_no").optional().trim().escape(),
    body("gender").trim().escape().notEmpty().withMessage("The gender field is required").isIn(["male", "female", "others"]).withMessage("The gender field must be male, female or others"),
    body("dob").optional().trim().escape().isDate().withMessage("The date of birth field is not a valid date"),
    body("address").trim().escape().notEmpty().withMessage("The address field is required"),
    body("address_bn").trim().escape().notEmpty().withMessage("The address bn field is required"),
    body("about_doctor").trim().escape().notEmpty().withMessage("The about doctor field is required"),
    body("about_doctor_bn").trim().escape().notEmpty().withMessage("The about doctor bn field is required"),
    body("experience").trim().escape().notEmpty().withMessage("The experience field is required"),
    body("experience_bn").trim().escape().notEmpty().withMessage("The experience bn field is required"),
    body("speciality").optional().trim().escape().isArray().withMessage("The speciality field must be an array"),
    body("qualification").optional().trim().escape().isArray().withMessage("The qualification field must be an array"),
    body("education").optional().trim().escape().isArray().withMessage("The education field must be an array"),
    body("language").optional().trim().escape().isArray().withMessage("The language field must be an array"),
    body("profile_picture").custom((value, {req}) => uploadedFileValidator(req, "profile_picture", "max:2048|mimes:image/jpeg,image/png")),
];


