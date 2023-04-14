const db = require('../models');

const postNewClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkDown || !data.address) {
        resolve({
          errCode: -1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let result = await db.Clinic.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkDown: data.descriptionMarkDown,
          address: data.address,
        });
        if (result) {
          resolve({
            errCode: 0,
            errMessage: 'Create Clinic success',
            result,
          });
        } else {
          resolve({
            errCode: -2,
            errMessage: 'Create Clinic failed',
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAllClinicServive = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, 'base64').toString('binary');
          return item;
        });
        resolve({
          errCode: 0,
          errMessage: 'Ok',
          data,
        });
      } else {
        resolve({
          errCode: -1,
          errMessage: 'Get Clinic failed',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailClinicByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: -1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: ['descriptionHTML', 'descriptionMarkDown', 'name', 'address'],
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ['doctorId'],
          });

          data.doctorClinic = doctorClinic;
        } else data = {};

        resolve({
          errCode: 0,
          errMessage: 'OK',
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postNewClinicService,
  getAllClinicServive,
  getDetailClinicByIdService,
  // getAllSpecialtySercive,
  // getDetailSpecialtyByIdService,
};
