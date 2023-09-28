const he = require('he');
const Division = require("../../models/Division");
const District = require("../../models/District");
const Upazila = require("../../models/Upazila");
const {moveUploadedFile} = require("../../utils/fileHandler.util");
const {baseURL} = require("../../configs/app");

const getDivisionData = async (id) => {
    try {
        const division = await Division.findById(id);
        if (division) {
            return {
                _id: division._id,
                name: {
                    en: division.name,
                    bn: division.bn_name,
                }
            }
        }
        return null;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
const getDistrictData = async (id) => {
    try {
        const district = await District.findById(id);
        if (district) {
            return {
                _id: district._id,
                name: {
                    en: district.name,
                    bn: district.bn_name,
                }
            }
        }
        return null;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
const getUpazilaData = async (id) => {
    try {
        const upazila = await Upazila.findById(id);
        if (upazila) {
            return {
                _id: upazila._id,
                name: {
                    en: upazila.name,
                    bn: upazila.bn_name,
                }
            }
        }
        return null;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

module.exports.saveChamberDataProcess = async ({body, files}) => {
    let imagePath = null;
    let logoPath = null;
    if (files) {
        if (files.logo && files.logo[0]) {
            logoPath = await moveUploadedFile(files.logo[0], "public/uploads/chambers");
        }
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
        operating_hours: {
            en: body.operating_hours,
            bn: body.operating_hours_bn
        },
        week_days: body.week_days,
        reg_no: body.reg_no
    }
    if (logoPath) {
        data.logo = logoPath;
    }
    return data;
}

module.exports.prepareEditFormData = (chamber) => {
    const data = {
        name: chamber?.name?.en,
        name_bn: chamber?.name?.bn,
        phone: chamber.phone,
        email: chamber.email,
        website: he.decode(chamber.website),
        reg_no: chamber.reg_no,
        logo_preview: baseURL + chamber.logo,
        week_days: chamber.week_days,
        operating_hours: chamber.operating_hours?.en,
        operating_hours_bn: chamber.operating_hours?.bn,
        division_id: chamber.division?._id,
        district_id: chamber.district?._id,
        upazila_id: chamber.upazila?._id,
        address: chamber.address.en,
        address_bn: chamber.address.bn,
        services: chamber.services,
        latitude: chamber.geo_location?.get('coordinates')[1],
        longitude: chamber.geo_location?.get('coordinates')[0],
    }
    return data;
}

module.exports.updateChamberDataProcess = async ({body, files}, chamber) => {
    const deleteableFilePaths = [];
    let imagePath = null;
    let logoPath = null;
    if (files) {
        if (files.logo && files.logo[0]) {
            logoPath = await moveUploadedFile(files.logo[0], "public/uploads/chambers");
            if (chamber.logo) {
                deleteableFilePaths.push(chamber.logo);
            }
        }
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
        week_days: body.week_days || [],
        operating_hours: {
            en: body.operating_hours,
            bn: body.operating_hours_bn
        },
        reg_no: body.reg_no
    }
    if (logoPath) {
        data.logo = logoPath;
    }
    return {data, deleteableFilePaths};
}

module.exports.chamberRemovableFiles = (chamber) => {
    const files = [];
    if (chamber.logo) {
        files.push(chamber.logo);
    }
    if (chamber.image) {
        files.push(chamber.image);
    }
    return files;
}
