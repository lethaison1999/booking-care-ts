const db = require('../models');

const postNewSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkDown) {
        resolve({
          errCode: -1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let result = await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkDown: data.descriptionMarkDown,
        });
        if (result) {
          resolve({
            errCode: 0,
            errMessage: 'Create specialty success',
            result,
          });
        } else {
          resolve({
            errCode: -2,
            errMessage: 'Create specialty failed',
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAllSpecialtySercive = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
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
          errMessage: 'Get specialty failed',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailSpecialtyByIdService = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: -1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let data = await db.Specialty.findOne({
          where: { id: inputId },
          attributes: ['descriptionHTML', 'descriptionMarkDown', 'name'],
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === 'ALL') {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ['doctorId', 'provinceId'],
            });
          } else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ['doctorId', 'provinceId'],
            });
          }
          data.doctorSpecialty = doctorSpecialty;
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
  postNewSpecialtyService,
  getAllSpecialtySercive,
  getDetailSpecialtyByIdService,
};
