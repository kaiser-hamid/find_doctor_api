const he = require('he');
const {baseURL} = require("../configs/app");

module.exports.chamberListResource = (data, isCollection = false) => {
    if(!isCollection){
        return {
            _id: data._id,
            logo: data.logo ? baseURL+data.logo : null,
            name: data.name,
            address: data.address,
            area: data.upazila.name,
            operating_hours: data.operating_hours,
            email: data.email,
            phone: data.phone,
            website: data.website ? he.decode(data.website) : null
        }
    }
    const collection = [];
    for (const item of data){
        collection.push({
            _id: item._id,
            logo: item.logo ? baseURL+item.logo : null,
            name: item.name,
            address: item.address,
            area: item.upazila.name,
            operating_hours: item.operating_hours,
            email: item.email,
            phone: item.phone,
            website: item.website ? he.decode(item.website) : null
        });
    }
    return collection;
}
