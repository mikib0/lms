import nodemailer from 'nodemailer';

const { MAIL, MAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: MAIL,
    pass: MAIL_PASS,
  },
  secure: false,
});

export default async function (to, name) {
  return await transporter.sendMail({
    to,
    subject: 'Order completed',
    from: `Nile LMS ${MAIL}`,
    html: `
<h1>Your laundry has been completed.</h1>
<p>Hey ${name}, your laundry is done. It will soon be delivered to your room.</p>
<p>Warm regards.</p>
`,
  });
}
