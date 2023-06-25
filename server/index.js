import 'dotenv/config'
import express from 'express';
import { hash } from 'bcrypt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import sequelize from './models/sequelize.js';
import Student from './models/student.js';
import Feedback from './models/feedback.js';
import Order from './models/order.js';
import Admin from './models/admin.js';
import LostButFound from './models/lostbutfound.js';
import './models/associations.js';

import adminAuth from './middlewares/adminAuth.js';
import authentication from './middlewares/authentication.js';

import upload from './upload.js';

import sendMail from './mail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/user', authentication, (req, res) => {
  res.json(req.user);
});

app.post(
  '/api/lostbutfounds',
  authentication,
  upload.single('picture'),
  async (req, res) => {
    const lbf = { description: req.body.description, src: req.file.filename };
    await LostButFound.create(lbf);
    res.sendStatus(200);
  }
);

app.get('/api/lostbutfounds', authentication, async (req, res) => {
  res.json(await LostButFound.findAll());
});

app.get('/api/images/:id', authentication, async (req, res) => {
  const imagePath = path.resolve(__dirname, `images/${req.params.id}`);
  res.sendFile(imagePath);
});

app.post(
  '/api/students',
  authentication,
  adminAuth,
  upload.single('image'),
  async (req, res) => {
    const newStudent = req.body;
    newStudent.passwordHash = await hash(newStudent.password, 10);
    newStudent.profileImage = req.file.filename;
    await Student.create(newStudent);
    res.json(await Student.findAll());
  }
);

app.get('/api/student', authentication, async (req, res) => {
  if (!req.user.isAdmin)
    res.json(await Student.findOne({ where: { id: req.user.id } }));
});

app.get('/api/students', authentication, adminAuth, async (req, res) => {
  const students = await Student.findAll();
  res.json(students.reverse());
});

app.delete(
  '/api/students/:student_id',
  authentication,
  adminAuth,
  async (req, res) => {
    const id = req.params.student_id;
    await Order.destroy({ where: { orderedBy: id } });
    await Feedback.destroy({ where: { feedbackBy: id } });
    await Student.destroy({
      where: {
        id,
      },
    });
    return res.json(await Student.findAll());
  }
);

app.get('/api/students/:student_id', async (req, res) => {
  const id = req.params.student_id;
  res.json(await Student.findOne({ where: { id } }));
});

app.put('/api/students', authentication, upload.single('image'), async (req, res) => {
  const id = req.user.id;
  const update = req.body;
  const isPasswordChange = !!update.newPassword
  if(isPasswordChange){
    const user = await Student.findOne({ where: { id } });
    const passwordCorrect = await bcrypt.compare(update.oldPassword, user.passwordHash)
    if(passwordCorrect){
      const newPasswordHash = await hash(update.newPassword, 10);
      await Student.update({passwordHash: newPasswordHash}, { where: { id } })
      res.sendStatus(204)
    } else{
      res.status(400).json({ error: 'Wrong old password' })
    }
    return
  }

  if(req.file){
    update.profileImage = req.file.filename
  }
  await Student.update(update, { where: { id } });
  res.json(await Student.findOne({ where: { id } }));
});

app.get('/api/orders', authentication, async (req, res) => {
  if (req.user.isAdmin) return res.json(await Order.findAll());
  res.json(await Order.findAll({ where: { orderedBy: req.user.id } }));
});

app.post('/api/orders', authentication, async (req, res) => {
  const user = req.user;
  const order = req.body;
  order.orderedBy = user.id;
  order.status = 'pending';
  order.date = new Date();
  const createdOrder = await Order.create(order);
  console.log(createdOrder.toJSON());
  res.json(createdOrder.toJSON());
});

app.patch('/api/orders/:id', authentication, async (req, res) => {
  const status = req.body.status;
  const id = req.params.id;

  if (!req.user.isAdmin && status !== 'canceled') {
    return res.status(400);
  }

  await Order.update({ status }, { where: { id } });

  if (status == 'completed'){
  const order = await Order.findOne({ where: { id } })
  const {email, firstName} = await Student.findOne({ where: { id: order.orderedBy } })
  await sendMail(email, firstName)
  }
  res.json(await Order.findAll());
});

app.put('/api/orders/:order_id', authentication, async (req, res) => {
  const update = req.body;
  await Order.update(update, { where: { id: req.params.order_id } });
  res.json(await Order.findAll());
});

app.post('/api/feedbacks', authentication, async (req, res) => {
  const feedback = req.body
  feedback.feedbackBy = req.user.id
  await Feedback.create(feedback);
  res.sendStatus(200).end();
});

app.get('/api/feedbacks', async (req, res) => {
  const result = await Feedback.findAll({
    include: {
      model: Student,
      on: {
        feedbackBy: sequelize.col('Student.id'),
      },
    },
  });
  const feebacks = result.map(
    ({ title, description, type, Student: { profileImage } }) => ({
      title,
      description,
      type,
      profileImage,
    })
  );
  res.json(feebacks);
});

app.post('/api/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;
  let user =
    (await Student.findOne({ where: { email } })) ??
    (await Admin.findOne({ where: { email } }));

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.sendStatus(401);
  }

  user = user.dataValues;
  user.isAdmin = !user.hasOwnProperty('level');
  const userForToken = {
    id: user.id,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(userForToken, process.env.secretKey); // TODO this is bad
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 86400000, // 24 hours
    //  secure: true, // Enable for HTTPS only
  });

  res.json(user);
});

app.post('/api/logout', (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('jwt');

  // Clear the "remember me" token cookie if exists
  res.clearCookie('rememberMe');

  res.redirect('/login');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
