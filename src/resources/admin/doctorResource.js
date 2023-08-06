const {baseURL} = require("../../configs/app");

module.exports.doctorListResource = (data, isCollection = false) => {
    if(!isCollection){
        return {
            _id: data._id,
            name: `${data.first_name?.en} ${data.last_name?.en}`,
            profile_picture: baseURL + data.profile_picture,
            phone: data.phone,
            email: data.email,
            address: data.address?.en,
            bmdc_reg_no: data.bmdc_reg_no,
            speciality: data.speciality,
        }
    }
    const collection = [];
    for (const item of data){
        collection.push({
            _id: item._id,
            name: `${item.first_name?.en} ${item.last_name?.en}`,
            profile_picture: baseURL + item.profile_picture,
            phone: item.phone,
            email: item.email,
            address: item.address?.en,
            bmdc_reg_no: item.bmdc_reg_no,
            speciality: item.speciality,
        });
    }
    return collection;
}
