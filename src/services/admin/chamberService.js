const {moveUploadedFile} = require("../../utils/fileHandler.util");
module.exports.saveChamberDataProcess = async ({body, files}) => {
    let imagePath = null;
    let logoPath = null;
    if(files.image && files.image[0]){
        imagePath  = await moveUploadedFile(files.image[0], "public/uploads/chambers");
    }
    if(files.logo && files.logo[0]){
        logoPath = await moveUploadedFile(files.logo[0], "public/uploads/chambers");
    }
    const data = {
        name: {
            en: body.name,
            bn: body.name_bn
        },
        address: {
            en: body.address,
            bn: body.address_bn
        },
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
        operating_hours: body.operating_hours,
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