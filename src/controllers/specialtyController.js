import specialtyService from '../services/specialtyService';

const postNewSpecialty = async (req, res) => {
  try {
    let response = await specialtyService.postNewSpecialtyService(req.body);
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
const getAllSpecialty = async (req, res) => {
  try {
    let response = await specialtyService.getAllSpecialtySercive();
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
const getDetailSpecialtyById = async (req, res) => {
  try {
    let response = await specialtyService.getDetailSpecialtyByIdService(req.query.id, req.query.location);
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
  postNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
};
