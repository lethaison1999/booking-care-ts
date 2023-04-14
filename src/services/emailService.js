require('dotenv').config();
import nodemailer from 'nodemailer';

const sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Thai son dev 👻" <lethaison04011999@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: 'Thông tin đặt lịch khám bệnh', // Subject line
    text: 'Hello world?', // plain text body
    html: getBodyHTML(dataSend),
  });
};

let getBodyHTML = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `
<h3>Xin chào ${dataSend.patientName}</h3>
<p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên trang Booking Care</p>
<p>Thông tin đặt lệch khám bệnh</p>
<div><b>Thời gian : ${dataSend.time}</b> </div>
<div><b>Bác sĩ : ${dataSend.doctorName}</b> </div>
<p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận thông tin và hoàn tất đặt lịch khám bệnh</p>
<div>
<a href=${dataSend.redirectLink} target="_blank">Nhấn vào đây </a>
</div>
<div>Xin chân thành cảm ơn quý khách đã sử dụng dịch vụ của Booking Care</div>
`; // html body
  }
  if (dataSend.language === 'en') {
    result = `
<h3>Dear ${dataSend.patientName}</h3>
<p>You received this email because you booked a medical appointment on Booking Care</p>
<p>Information on misplaced medical examination</p>
<div><b>Time : ${dataSend.time}</b> </div>
<div><b>Doctor : ${dataSend.doctorName}</b> </div>
<p>
If the above information is true, please click on the link below to confirm the information and complete the appointment.</p>
<div>
<a href=${dataSend.redirectLink} target="_blank">Click here</a>
</div>
<div>Thank you very much for using Booking Care's service</div>
`; // html body
  }
  return result;
};
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = '';
  if (dataSend.language === 'vi') {
    result = `
  <h3>Xin chào ${dataSend.patientName} </h3>
  <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên trang Booking Care thành công</p>
  <p>Thông tin đơn thuốc hóa đơn được gửi trong file đính kèm</p>

    <div> Chân thành cảm ơn quý khách đã sử dụng dịch vụ của Booking Care</div>
`; // html body
  }
  if (dataSend.language === 'en') {
    result = `
      <h3>Dear ${dataSend.patientName}</h3>
      <p>You received this email because you have successfully booked a medical appointment on the Booking Care page</p>
      <p>Information on prescriptions and invoices is sent in the attached file</p>

      div>Thank you very much for using Booking Care's service</div>
`; // html body
  }
  return result;
};
let sendAttachment = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Lê Thái Sơn 👻" <lethaison04011999@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: 'Kết quả đặt lịch khám bệnh', // Subject line
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split('base64,')[1],
        encoding: 'base64',
      },
    ],
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
