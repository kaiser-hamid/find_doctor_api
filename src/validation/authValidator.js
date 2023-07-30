const { body} = require("express-validator");

module.exports.loginPost = [
    body("email").trim().escape().notEmpty().withMessage("Email is required").normalizeEmail().isEmail().withMessage("Email is not valid"),
    body("password").trim().escape().notEmpty().withMessage("Password is required"),
];
module.exports.changePassword = [
    body("old_password").trim().escape().notEmpty().withMessage("Old password is required"),
    body("password").trim().escape().notEmpty().withMessage("Password is required").isLength({min: 6}).withMessage("Password must be at least 6 character long"),
    body("password_confirmation").trim().escape().custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Confirm password does not match');
        }
        return true;
    }).withMessage("Confirm password does not match"),
];