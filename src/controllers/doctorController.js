import doctorService from '../services/doctorService';

const getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHomeService(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctorService();
    // console.log('doctors', doctors);
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
const postInforDoctors = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    // console.log('response post doctor :', response);
    if (response && response.errCode === 0) {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
const getDetailDoctorById = async (req, res, inputId) => {
  try {
    let response = await doctorService.getDetailDoctorByIdService(req.query.id);
    // console.log('response get  doctor :', response);
    if (response && response.errCode === 0) {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
const bulkCreateSchedule = async (req, res) => {
  try {
    let response = await doctorService.bulkCreateScheduleService(req.body);
    if (response && response.errCode === 0) {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
const getScheduleByDate = async (req, res) => {
  try {
    let response = await doctorService.getScheduleByDateService(req.query.doctorId, req.query.date);
    if (response && response.errCode === 0) {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
const getExtraInforDoctorById = async (req, res) => {
  try {
    let response = await doctorService.getExtraInforDoctorByIdService(req.query.doctorId);
    if (response && response.errCode === 0) {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
const getProfileInforDoctorById = async (req, res) => {
  try {
    let response = await doctorService.getProfileInforDoctorByIdService(req.query.doctorId);
    if (response && response.errCode === 0) {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
const getListPatientForDoctor = async (req, res) => {
  try {
    let response = await doctorService.getListPatientForDoctorService(
      req.query.doctorId,
      req.query.date
    );
    if (response && response.errCode === 0) {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
const postSendRemedy = async (req, res) => {
  try {
    let response = await doctorService.postSendRemedyService(req.body);
    if (response && response.errCode === 0) {
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctors: postInforDoctors,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
  getProfileInforDoctorById: getProfileInforDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  postSendRemedy: postSendRemedy,
};
