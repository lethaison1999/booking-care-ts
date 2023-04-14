import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

const postPatientBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.date ||
        !data.timeType ||
        !data.fullName ||
        !data.address ||
        !data.setlectedGender
      ) {
        resolve({
          errCode: -1,
          errMessage: 'Missing required Parameter...',
        });
      } else {
        let token = uuidv4();

        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        // upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: 'R3',
            address: data.address,
            gender: data.setlectedGender,
            firstName: data.fullName,
          },
        });

        //create a booking record
        // console.log('check user :', user[0]);
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: 'S1',
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: 'Save infor patient success',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const postVerifyPatientBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token && !data.doctorId) {
        resolve({
          errCode: -1,
          errMessage: 'Missing required token and doctorId ..',
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: { doctorId: data.doctorId, token: data.token, statusId: 'S1' },
          raw: false, //use update =>sequelize obj dung de save
        });
        if (appointment) {
          appointment.statusId = 'S2';
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: 'Update the appointment successfully',
          });
        } else {
          resolve({
            errCode: -1,
            errMessage: 'Appointment has been activated of does not exist',
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postPatientBookAppointmentService: postPatientBookAppointmentService,
  postVerifyPatientBookAppointmentService: postVerifyPatientBookAppointmentService,
};
