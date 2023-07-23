const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {userResource} = require("../../resources/authResource")
const {responseAPI, parseFirstErrorMsg} = require("../../utils/general.util");
const {validate} = require("../../utils/general.util")
const User = require("../../models/User");

module.exports.loginCheckGet = async (req, res) => {
    if(req.user){
        res.json(responseAPI(true, "Admin information", userResource(req.user)));
    }
    res.json(responseAPI(false, "Unauthenticated"));
}

module.exports.loginPost = async (req, res) => {
    try{
        const errors = validate(req);
        if(errors){
            res.json(responseAPI(false, parseFirstErrorMsg(errors), [], errors))
        }
        const {email, password} = req.body;
        const user = await User.findOne({email: email})
        if(!user){
            res.json(responseAPI(false, "User or password doesn't match"));
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            res.json(responseAPI(false, "User or password doesn't match"));
        }
        const token = jwt.sign({
            user: user
        }, process.env.AUTH_SECRET, {expiresIn: '1h'});
        res.json(responseAPI(true, "Logged in successfully", {token, user: userResource(user)}));
    }catch (e){
        res.status(400).json(responseAPI(false, e.message));
    }
}

module.exports.changePassword = async (req, res) => {
    try{
        const errors = validate(req);
        if(errors){
            res.json(responseAPI(false, parseFirstErrorMsg(errors), [], errors))
        }
        const {email, password} = req.body;
        const user = await User.findOne({email: email})
        if(!user){
            res.json(responseAPI(false, "User or password doesn't match"));
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            res.json(responseAPI(false, "User or password doesn't match"));
        }
        const token = jwt.sign({
            user: user
        }, process.env.AUTH_SECRET, {expiresIn: '1h'});
        res.json(responseAPI(true, "Logged in successfully", {token, user: userResource(user)}));
    }catch (e){
        res.status(400).json(responseAPI(false, e.message));
    }
}

module.exports.tempUserInsertPost = async (req, res) => {
    try{
        const user = new User({
            first_name: "Kaiser",
            last_name: "Hamid",
            email: "admin@localhost.com",
            password: "$2a$12$XQeEfHvJ8YvLv0N9o/XMNuDwWeErgvZgrDQ8Ps1Ma9YPnspLYoh6a",
            gender: "male",
            dob: "1992-03-23",
            active_status: 1,
        });
        const result = await user.save();
        res.json(responseAPI(true, result));
    }catch (e){
        res.status(400).json(responseAPI(false, e.message));
    }
}

