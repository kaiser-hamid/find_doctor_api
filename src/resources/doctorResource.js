const {baseURL} = require("../configs/app");

module.exports.doctorListResource = (data, isCollection = false) => {
    if(!isCollection){
        return {
            id: data._id,
            name: {en: data.full_name_en, bn: data.full_name_bn},
            profile_picture: data.profile_picture ? baseURL + data.profile_picture : null,
            gender: data.gender || "male",
            designation: data.designation,
            degree: data.degree,
            experience: data.experience,
        }
    }
    const collection = [];
    for (const item of data){
        collection.push({
            id: item._id,
            name: {en: item.full_name_en, bn: item.full_name_bn},
            profile_picture: item.profile_picture ? baseURL + item.profile_picture: null,
            gender: item.gender || "male",
            designation: item.designation,
            degree: item.degree,
            experience: item.experience,
        });
    }
    return collection;
}

