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