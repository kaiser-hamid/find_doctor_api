const {baseURL} = require("../configs/app");

module.exports.doctorListResource = (data, isCollection = false) => {
    if(!isCollection){
        return {
            id: data._id,
            name: {en: data.full_name_en, bn: data.full_name_bn},
            profile_picture: baseURL + data.profile_picture,
            designation: data.designation,
            degree: data.degree
        }
    }
    const collection = [];
    for (const item of data){
        collection.push({
            id: item._id,
            name: {en: item.full_name_en, bn: item.full_name_bn},
            profile_picture: baseURL + item.profile_picture,
            designation: item.designation,
            degree: item.degree
        });
    }
    return collection;
}

