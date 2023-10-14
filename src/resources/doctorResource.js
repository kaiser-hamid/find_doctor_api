const {baseURL} = require("../configs/app");

module.exports.doctorListResource = (data, isCollection = false) => {
    if(!isCollection){
        return {
            id: data._id,
            name: {en: `${data.first_name?.en} ${data.last_name?.en}`, bn: `${data.first_name?.bn} ${data.last_name?.bn}`},
            profile_picture: baseURL + data.profile_picture,
            designation: data.designation,
            degree: data.degree
        }
    }
    const collection = [];
    for (const item of data){
        collection.push({
            id: item._id,
            name: {en: `${item.first_name?.en} ${item.last_name?.en}`, bn: `${item.first_name?.bn} ${item.last_name?.bn}`},
            profile_picture: baseURL + item.profile_picture,
            designation: item.designation,
            degree: item.degree
        });
    }
    return collection;
}

