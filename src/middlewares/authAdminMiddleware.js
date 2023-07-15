const jwt = require("jsonwebtoken");
const {responseAPI} = require("../utils/general.util");

module.exports = (req, res, next) => {
    try{
        const {authorization} = req.headers;
        if(!authorization){
            throw new Error("Unauthenticated!");
        }
        const token = authorization.split(" ")[1];
        if(!token){
            throw new Error("Unauthenticated!");
        }
        const decode = jwt.verify(token, process.env.AUTH_SECRET);
        req.user = decode.user;
        next();
    }catch (e){
        res.status(401).json(responseAPI(false, e.message));
    }
}