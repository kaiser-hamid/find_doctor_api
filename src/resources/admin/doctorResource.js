const {baseURL} = require("../../configs/app");

module.exports.doctorListResource = (data, isCollection = false) => {
    if(!isCollection){
        return {
            _id: data._id,
            name: `${data.first_name?.en} ${data.last_name?.en}`,
            profile_picture: data.profile_picture ? baseURL + data.profile_picture : null,
            gender: data.gender || "male",
            phone: data.phone || null,
            email: data.email || null,
            address: data?.address?.en || null,
            bmdc_reg_no: data.bmdc_reg_no || null,
            speciality: data.speciality,
            chamber: data.chamber ? data.chamber?.map(item => item.name.en) : []
        }
    }
    const collection = [];
    for (const item of data){
        collection.push({
            _id: item._id,
            name: `${item.first_name?.en} ${item.last_name?.en}`,
            profile_picture: item.profile_picture ? baseURL + item.profile_picture : null,
            gender: item.gender || "male",
            phone: item.phone || null,
            email: item.email || null,
            address: item?.address?.en || null,
            bmdc_reg_no: item.bmdc_reg_no || null,
            speciality: item.speciality,
            chamber: item.chamber ? item.chamber?.map(item => item.name.en) : []
        });
    }
    return collection;
}

