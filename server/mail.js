import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'mikib0@outlook.com',
    pass: '5SWwX5zFjM4PbgS',
  },
  secure: false, 
});

export default async function(to, name){
  return await transporter.sendMail({
    to,
    subject: 'Order completed',
    from: 'Nile LMS mikib0@outlook.com',
    html: `
<h1>Your laundry has been completed.</h1>
<p>Hey ${name}, your laundry is done. It will soon be delivered to your room.</p>
<p>Warm regards.</p>
`,
  });
}
