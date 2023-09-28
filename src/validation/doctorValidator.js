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
    body("about_doctor").trim().escape().notEmpty().withMessage("The about doctor field is required"),
    body("about_doctor_bn").trim().escape().notEmpty().withMessage("The about doctor bn field is required"),
    body("degree").trim().escape().notEmpty().withMessage("The degree field is required").isArray().withMessage("The degree field must be an array"),
    body("designation").trim().escape().notEmpty().withMessage("The designation field is required"),
    body("institute").optional().trim().escape().isString().withMessage("The institute field must be a string required"),
    body("experience").optional().trim().escape().isNumeric().withMessage("The experience field must be a number"),
    body("speciality").optional().trim().escape().isArray().withMessage("The speciality field must be an array"),
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
    body("about_doctor").trim().escape().notEmpty().withMessage("The about doctor field is required"),
    body("about_doctor_bn").trim().escape().notEmpty().withMessage("The about doctor bn field is required"),
    body("degree").trim().escape().notEmpty().withMessage("The degree field is required").isArray().withMessage("The degree field must be an array"),
    body("designation").trim().escape().notEmpty().withMessage("The designation field is required"),
    body("institute").optional().trim().escape().isString().withMessage("The institute field must be a string required"),
    body("experience").optional().trim().escape().isNumeric().withMessage("The experience field must be a number"),
    body("speciality").optional().trim().escape().isArray().withMessage("The speciality field must be an array"),
    body("profile_picture").custom((value, {req}) => uploadedFileValidator(req, "profile_picture", "max:2048|mimes:image/jpeg,image/png")),
];


