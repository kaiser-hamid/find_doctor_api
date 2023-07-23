const moment = require("moment");

module.exports.userResource = (data, isCollection = false) => {
    if(!isCollection){
        return {
            // id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: "DIAMOND",
            gender: data.gender,
            // dob: moment(data.dob).format("DD-MM-YYYY"),
        }
    }
    const collection = [];
    for (const item in data){
        collection.push({
            // id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
            role: "DIAMOND",
            gender: item.gender,
            // dob: moment(item.dob).format("DD-MM-YYYY"),
        });
    }
    return collection;
}