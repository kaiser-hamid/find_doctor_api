const he = require('he');
const moment = require("moment");
const {baseURL} = require("../configs/app");

module.exports.doctorDetailsDataProcess = (doctor) => {
    const data = {
        id: doctor._id,
        name: {
            en: `${doctor.first_name?.en} ${doctor.last_name?.en}`,
            bn: `${doctor.first_name?.bn} ${doctor.last_name?.bn}`
        },
        profile_picture: baseURL + doctor.profile_picture,
        gender: doctor.gender,
        reg_no: doctor.bmdc_reg_no,
        about_doctor: doctor.about_doctor,
        experience: doctor.experience,
        speciality: doctor.speciality,
        qualification: doctor.speciality,
        education: doctor.education,
        language: doctor.language,
        total_views: doctor.views,
        rating: doctor.rating,
        chambers: getDoctorChambers(doctor.chamber)
    }
    return data;
}

const getDoctorChambers = (chambers) => {
    if(!chambers){
        return null;
    }
    const data = chambers.map(chamber => {
        return {
            name: chamber.name,
            location: {
                en: `${chamber._id.upazila.name.en}, ${chamber._id.district.name.en}`,
                bn: `${chamber._id.upazila.name.bn}, ${chamber._id.district.name.bn}`,
            },
            coordinates: {
                latitude: chamber._id.geo_location?.get('coordinates')[1],
                longitude: chamber._id.geo_location?.get('coordinates')[0],
            },
            schedule: {
                start: moment("2000-12-31 "+ chamber.schedule.start).format('h:ma'),
                end: moment("2000-12-31 "+ chamber.schedule.end).format('h:ma')
            },
            phone: chamber.phone,
            week_days: chamber.week_days,
        };
    });
    return data;

}

