const he = require('he');
const {baseURL} = require("../../configs/app");

module.exports.chamberListResource = (data, isCollection = false) => {
    if(!isCollection){
        return {
            _id: data._id,
            logo: data.logo ? baseURL+data.logo : null,
            name: data.name?.en,
            address: data.address?.en,
            week_days: data.week_days,
            operating_hours: data.operating_hours?.en,
            email: data.email || null,
            phone: data.phone,
            website: data.website ? he.decode(data.website) : null
        }
    }
    const collection = [];
    for (const item of data){
        collection.push({
            _id: item._id,
            logo: item.logo ? baseURL+item.logo : null,
            name: item.name?.en,
            address: item.address?.en,
            week_days: item.week_days,
            operating_hours: item.operating_hours?.en,
            email: item.email || null,
            phone: item.phone,
            website: item.website ? he.decode(item.website) : null
        });
    }
    return collection;
}
