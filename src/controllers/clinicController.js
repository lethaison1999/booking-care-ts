import clinicService from '../services/clinicService';

const postNewClinic = async (req, res) => {
  try {
    let response = await clinicService.postNewClinicService(req.body);
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
const getAllClinic = async (req, res) => {
  try {
    let response = await clinicService.getAllClinicServive();
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
const getDetailClinicById = async (req, res) => {
  try {
    let response = await clinicService.getDetailClinicByIdService(req.query.id);
    if (response && response.errCode === 0) {
      return res.status(200).json(response);
    }
  } catch (e) {
    // console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from Server ...',
    });
  }
};
module.exports = {
  postNewClinic,
  getAllClinic,
  getDetailClinicById,
  // getAllSpecialty,
  // getDetailSpecialtyById,
};
