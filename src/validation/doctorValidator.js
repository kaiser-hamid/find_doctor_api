const {body} = require("express-validator");
const uploadedFileValidator = require("./uploadedFileValidator");

module.exports.saveDoctor = [
    body("first_name").trim().escape().notEmpty().withMessage("The first name field is required"),
    body("first_name_bn").trim().escape().notEmpty().withMessage("The first name (bn) field is required"),
    body("last_name").trim().escape().notEmpty().withMessage("The last name field is required"),
    body("last_name_bn").trim().escape().notEmpty().withMessage("The last name (bn) field is required"),
    body("profile_picture").custom((value, {req}) => uploadedFileValidator(req, "profile_picture", "max:2048|mimes:image/jpeg,image/png")),
    body("gender").trim().escape().notEmpty().withMessage("The gender field is required").isIn(["male", "female", "others"]).withMessage("The gender field must be male, female or others"),
    body("phone").trim().escape().optional(),
    body("email").optional({values: "falsy"}).trim().escape().isEmail().withMessage("The email format is wrong"),
    body("bmdc_reg_no").optional().trim().escape(),
    body("experience").optional({values: "falsy"}).trim().escape().isNumeric().withMessage("The experience field must be a number"),
    body("designation").trim().escape().notEmpty().withMessage("The designation field is required"),
    body("degree").trim().escape().notEmpty().withMessage("The degree field is required").isArray().withMessage("The degree field must be an array"),
    body("institute").optional().trim().escape().isString().withMessage("The institute field must be a string required"),
    body("speciality").optional().trim().escape().isArray().withMessage("The speciality field must be an array"),
    body("about_doctor").trim().escape().optional(),
    body("about_doctor_bn").trim().escape().optional()
];

module.exports.updateDoctor = [
    body("first_name").trim().escape().notEmpty().withMessage("The first name field is required"),
    body("first_name_bn").trim().escape().notEmpty().withMessage("The first name (bn) field is required"),
    body("last_name").trim().escape().notEmpty().withMessage("The last name field is required"),
    body("last_name_bn").trim().escape().notEmpty().withMessage("The last name (bn) field is required"),
    body("profile_picture").custom((value, {req}) => uploadedFileValidator(req, "profile_picture", "max:2048|mimes:image/jpeg,image/png")),
    body("gender").trim().escape().notEmpty().withMessage("The gender field is required").isIn(["male", "female", "others"]).withMessage("The gender field must be male, female or others"),
    body("phone").trim().escape().optional(),
    body("email").optional({values: "falsy"}).trim().escape().isEmail().withMessage("The email format is wrong"),
    body("bmdc_reg_no").optional().trim().escape(),
    body("experience").optional({values: "falsy"}).trim().escape().isNumeric().withMessage("The experience field must be a number"),
    body("designation").trim().escape().notEmpty().withMessage("The designation field is required"),
    body("degree").trim().escape().notEmpty().withMessage("The degree field is required").isArray().withMessage("The degree field must be an array"),
    body("institute").optional().trim().escape().isString().withMessage("The institute field must be a string required"),
    body("speciality").optional().trim().escape().isArray().withMessage("The speciality field must be an array"),
    body("about_doctor").trim().escape().optional(),
    body("about_doctor_bn").trim().escape().optional()
];


