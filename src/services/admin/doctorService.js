const he = require('he');
const Chamber = require("../../models/Chamber");
const {moveUploadedFile} = require("../../utils/fileHandler.util");
const {baseURL} = require("../../configs/app");

const getChambersData = async (ids) => {
    try {

        const chambers = await Chamber.find({"_id": {$in: ids}}, {name: 1});
        if (chambers.length) {
            return chambers;
        }
        return [];
    } catch (e) {
        console.log(e.message);
        return [];
    }
}

module.exports.saveDoctorDataProcess = async ({body, files}) => {
    let profilePicturePath = null;
    if (files) {
        if (files.profile_picture && files.profile_picture[0]) {
            profilePicturePath = await moveUploadedFile(files.profile_picture[0], "public/uploads/doctors");
        }
    }

    const chambers = await getChambersData(body.chamber);
    const data = {
        first_name: {
            en: body.first_name,
            bn: body.first_name_bn
        },
        last_name: {
            en: body.last_name,
            bn: body.last_name_bn
        },
        phone: body.phone,
        email: body.email,
        gender: body.gender,
        dob: body.dob,
        address: {
            en: body.address,
            bn: body.address_bn
        },
        bmdc_reg_no: body.bmdc_reg_no,
        chamber: body.chamber ? chambers : [],
        speciality: body.speciality || [],
        qualification: body.qualification || [],
        education: body.education || [],
        experience: body.experience || [],
        language: body.language || [],
    }
    if (profilePicturePath) {
        data.profile_picture = profilePicturePath;
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
        image_preview: baseURL + chamber.image,
        logo_preview: baseURL + chamber.logo,
        operating_hours: chamber.operating_hours?.en,
        operating_hours_bn: chamber.operating_hours?.bn,
        est: chamber.est,
        division_id: chamber.division?._id,
        district_id: chamber.district?._id,
        upazila_id: chamber.upazila?._id,
        address: chamber.address.en,
        address_bn: chamber.address.bn,
        services: chamber.services,
        departments: chamber.departments,
        facilities: chamber.facilities,
        latitude: chamber.geo_location?.get('coordinates')[1],
        longitude: chamber.geo_location?.get('coordinates')[0],
    }
    return data;
}

module.exports.updateDoctorDataProcess = async ({body, files}, chamber) => {
    const deleteableFilePaths = [];
    let imagePath = null;
    let logoPath = null;
    if (files) {
        if (files.image && files.image[0]) {
            imagePath = await moveUploadedFile(files.image[0], "public/uploads/chambers");
            if (chamber.image) {
                deleteableFilePaths.push(chamber.image);
            }
        }
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
        departments: body.departments || [],
        facilities: body.facilities || [],
        operating_hours: {
            en: body.operating_hours,
            bn: body.operating_hours_bn
        },
        est: body.est,
        reg_no: body.reg_no
    }
    if (imagePath) {
        data.image = imagePath;
    }
    if (logoPath) {
        data.logo = logoPath;
    }
    return {data, deleteableFilePaths};
}

module.exports.doctorRemovableFiles = (chamber) => {
    const files = [];
    if (chamber.logo) {
        files.push(chamber.logo);
    }
    if (chamber.image) {
        files.push(chamber.image);
    }
    return files;
}
