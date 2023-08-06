const {baseURL} = require("../../configs/app");

module.exports.chamberListResource = (data, isCollection = false) => {
    if(!isCollection){
        return {
            _id: data._id,
            logo: baseURL+data.logo,
            name: data.name?.en,
            address: data.address?.en,
            operating_hours: data.operating_hours?.en,
            email: data.email,
            phone: data.phone,
            website: data.website
        }
    }
    const collection = [];
    for (const item of data){
        collection.push({
            _id: item._id,
            logo: baseURL+item.logo,
            name: item.name?.en,
            address: item.address?.en,
            operating_hours: item.operating_hours?.en,
            email: item.email,
            phone: item.phone,
            website: item.website
        });
    }
    return collection;
}
