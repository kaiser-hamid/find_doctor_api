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
        about_doctor: {
            en: body.about_doctor,
            bn: body.about_doctor_bn,
        },
        experience: {
            en: body.experience,
            bn: body.experience_bn
        },
        bmdc_reg_no: body.bmdc_reg_no,
        speciality: body.speciality || [],
        qualification: body.qualification || [],
        education: body.education || [],
        language: body.language || [],
    }
    if (profilePicturePath) {
        data.profile_picture = profilePicturePath;
    }
    return data;
}

module.exports.prepareEditFormData = (doctor) => {
    const data = {
        first_name: doctor.first_name?.en,
        first_name_bn: doctor.first_name?.bn,
        last_name: doctor.last_name?.en,
        last_name_bn: doctor.last_name?.bn,
        phone: doctor.phone,
        email: doctor.email,
        profile_picture_preview: baseURL + doctor.profile_picture,
        chamber: doctor.chamber?.map(c => {
            return {id: c._id, label: c.name?.en, value: c._id}
        }),
        gender: doctor.gender,
        dob: doctor.dob,
        bmdc_reg_no: doctor.bmdc_reg_no,
        address: doctor.address?.en,
        address_bn: doctor.address?.bn,
        about_doctor: doctor.about_doctor?.en,
        about_doctor_bn: doctor.about_doctor?.bn,
        experience: doctor.experience?.en,
        experience_bn: doctor.experience?.bn,
        speciality: doctor.speciality,
        qualification: doctor.qualification,
        education: doctor.education,
        language: doctor.language,
    }
    return data;
}

module.exports.updateDoctorDataProcess = async ({body, files}, doctor) => {
    const deleteableFilePaths = [];
    let profilePicturePath = null;
    if (files) {
        if (files.profile_picture && files.profile_picture[0]) {
            profilePicturePath = await moveUploadedFile(files.profile_picture[0], "public/uploads/doctors");
            if (doctor.profile_picture) {
                deleteableFilePaths.push(doctor.profile_picture);
            }
        }
    }
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
        about_doctor: {
            en: body.about_doctor,
            bn: body.about_doctor_bn,
        },
        experience: {
            en: body.experience,
            bn: body.experience_bn
        },
        bmdc_reg_no: body.bmdc_reg_no,
        speciality: body.speciality || [],
        qualification: body.qualification || [],
        education: body.education || [],
        language: body.language || [],
    }
    if (profilePicturePath) {
        data.profile_picture = profilePicturePath;
    }
    return {data, deleteableFilePaths};
}

module.exports.prepareChamberAssignFormData = (chambers) => {
    if (!chambers) {
        return [];
    }
    const data = chambers.map(item => {
        return {
            chamber_id: item._id,
            phone: item.phone,
            schedule_start: item.schedule.start,
            schedule_end: item.schedule.end,
            week_days: item.week_days,
        }
    });
    return data;
}
module.exports.updateDoctorChamberDataProcess = async ({body}) => {
    let data = []
    if (!body.chamber) {
        return data;
    }
    const chamberIds = Object.keys(body.chamber);
    let updatedChambers = await getChambersData(chamberIds);
    if (!updatedChambers.length) {
        throw new Error("Chambers not found");
    }
    data = updatedChambers.map(item => {
        const {phone, schedule_start, schedule_end, week_days} = body.chamber[item._id];
        return {
            _id: item._id,
            name: item.name,
            phone,
            schedule: {
                start: schedule_start,
                end: schedule_end
            },
            week_days
        };
    });
    return data;
}

module.exports.doctorRemovableFiles = (doctor) => {
    const files = [];
    if (doctor.profile_picture) {
        files.push(doctor.profile_picture);
    }
    return files;
}
