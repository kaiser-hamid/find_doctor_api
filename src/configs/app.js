module.exports.environment = process.env.ENVIRONMENT || "local";
module.exports.port = process.env.PORT || "3000";
module.exports.baseURL = process.env.BASE_URL || "http://localhost:3000/";
module.exports.db_endpoint = process.env.DB_ENDPOINT || "mongodb://127.0.0.1:27017/find_dr";
