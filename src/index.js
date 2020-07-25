const express = require('express');
const bodyParser = require('body-parser');
const { userService } = require('./services/index');
require('express-async-errors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use((err, request, response, next) => {
  console.error(err);
  response.status(500).json({ errorMessage: err.message });
  return next();
});

app.get('/users', async (req, res) => {
  const allUsers = await userService.getAllUsers();

  return res.status(200).json(allUsers);
});

app.get('/user/:id', async (req, res) => {
  const userId = +req.params.id;
  const userById = await userService.getUserById(userId);

  return res.status(200).json(userById);
});

app.post('/register', async (req, res) => {
  const userData = req.body;
  const createdUser = await userService.registerUser(userData);

  return res.status(200).json(createdUser);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
