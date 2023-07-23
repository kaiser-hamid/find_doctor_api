const {checkSchema} = require("express-validator");

module.exports.login = () => {
    return checkSchema({
        email: {
            trim: true,
            escape: true,
            errorMessage: "Email is not valid",
            isEmail: true,
            normalizeEmail: {
                options: {gmail_lowercase: true}
            },
        },
        password: {
            trim: true,
            escape: true,
            errorMessage: "Password is required",
            notEmpty: true,
        }
    })
}
module.exports.changePass = () => {
    return checkSchema({
        old_password: {
            trim: true,
            escape: true,
            errorMessage: "Old password is required",
            notEmpty: true,
        },
        password: {
            trim: true,
            escape: true,
            errorMessage: "Password is required",
            notEmpty: true,
        },
        password_confirmation: {
            trim: true,
            escape: true,
            errorMessage: "Confirm password is required",
            notEmpty: true,
        }
    })
}