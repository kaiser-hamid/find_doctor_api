const Division = require("../../models/Division");
const District = require("../../models/District");
const Upazila = require("../../models/Upazila");
const {moveUploadedFile} = require("../../utils/fileHandler.util");

const getDivisionData = async (id) => {
    try{
        const division = await Division.findById(id);
        if(division){
            return {
                _id: division._id,
                name: {
                    en: division.name,
                    bn: division.bn_name,
                }
            }
        }
        return null;
    }catch (e) {
        console.log(e.message);
        return null;
    }
}
const getDistrictData = async (id) => {
    try{
        const district = await District.findById(id);
        if(district){
            return {
                _id: district._id,
                name: {
                    en: district.name,
                    bn: district.bn_name,
                }
            }
        }
        return null;
    }catch (e) {
        console.log(e.message);
        return null;
    }
}
const getUpazilaData = async (id) => {
    try{
        const upazila = await Upazila.findById(id);
        if(upazila){
            return {
                _id: upazila._id,
                name: {
                    en: upazila.name,
                    bn: upazila.bn_name,
                }
            }
        }
        return null;
    }catch (e) {
        console.log(e.message);
        return null;
    }
}

module.exports.saveChamberDataProcess = async ({body, files}) => {
    let imagePath = null;
    let logoPath = null;
    if(files.image && files.image[0]){
        imagePath  = await moveUploadedFile(files.image[0], "public/uploads/chambers");
    }
    if(files.logo && files.logo[0]){
        logoPath = await moveUploadedFile(files.logo[0], "public/uploads/chambers");
    }
    const division = await getDivisionData(body.division_id);
    const district = await getDistrictData(body.district_id);
    const upazila = await getUpazilaData(body.upazila_id);
    const data = {
        name: {
            en: body.name,
            bn: body.name_bn
        },
        address: {
            en: body.address,
            bn: body.address_bn
        },
        division,
        district,
        upazila,
        phone: body.phone,
        email: body.email,
        website: body.website,
        geo_location: {
            type: "Point",
            coordinates: [body.longitude, body.latitude]
        },
        services: body.services || [],
        departments: body.departments || [],
        facilities: body.facilities || [],
        operating_hours: {
            en: body.operating_hours,
            bn: body.operating_hours_bn
        },
        est: body.est,
        reg_no: body.reg_no
    }
    if(imagePath){
        data.image = imagePath;
    }
    if(logoPath){
        data.logo = logoPath;
    }
    return data;
}
