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
        about_doctor: {
            en: body.about_doctor,
            bn: body.about_doctor_bn,
        },
        bmdc_reg_no: body.bmdc_reg_no,
        experience: body.experience,
        institute: body.institute,
        designation: body.designation,
        degree: body.degree,
        speciality: body.speciality || [],
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
        gender: doctor.gender,
        bmdc_reg_no: doctor.bmdc_reg_no,
        about_doctor: doctor.about_doctor?.en,
        about_doctor_bn: doctor.about_doctor?.bn,
        experience: doctor.experience,
        degree: doctor.degree?.map(d => {
            return {id: d, label: d, value: d}
        }),
        designation: doctor.designation ? he.decode(doctor.designation) : "",
        institute: doctor.institute ? he.decode(doctor.institute) : "",
        speciality: doctor.speciality,
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
        about_doctor: {
            en: body.about_doctor,
            bn: body.about_doctor_bn,
        },
        bmdc_reg_no: body.bmdc_reg_no,
        experience: body.experience,
        institute: body.institute,
        degree: body.degree,
        designation: body.designation,
        speciality: body.speciality || [],
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
    const data = chambers?.map(item => {
        let phone = item.phone?.map(ph => {
            return {label: ph, value: ph};
        });
        return {
            chamber_id: item._id,
            phone,
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
