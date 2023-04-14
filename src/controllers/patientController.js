import patientService from '../services/patientService';

const postPatientBookAppointment = async (req, res, next) => {
  try {
    let response = await patientService.postPatientBookAppointmentService(
      req.body
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
const postVerifyPatientBookAppointment = async (req, res) => {
  try {
    let response = await patientService.postVerifyPatientBookAppointmentService(
      req.body
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
module.exports = {
  postPatientBookAppointment: postPatientBookAppointment,
  postVerifyPatientBookAppointment: postVerifyPatientBookAppointment,
};
