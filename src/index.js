const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const { userService } = require('./services/index');
require('./utils/passport-config');
require('express-async-errors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(session({
  secret: process.env.EXPRESS_SECRET_KEY || 'ntkm6GDrbS',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use((err, request, response, next) => response.status(500).json({ errorMessage: err }));

app.get('/users', async (req, res) => {
  const allUsers = await userService.getAllUsers();

  return res.status(200).json(allUsers);
});

app.get('/user/:id', async (req, res) => {
  const userId = +req.params.id;
  const userById = await userService.getUserById(userId);

  return res.status(200).json(userById);
});

app.get('/posts/:id', async (req, res) => {
  const userId = +req.params.id;
  try {
    const postsByUserId = await userService.getPostsByUserId(userId);
    return res.status(200).json(postsByUserId);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: err });
  }
});

app.post('/register', async (req, res) => {
  const userName = req.body.username;
  const userPassword = req.body.password;

  const userData = {
    username: userName,
    password: userPassword,
  };

  try {
    const createdUser = await userService.registerUser(userData);

    return res.status(200).json(createdUser);
  } catch (err) {
    return res.json(err.message);
  }
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/users',
  failureFlash: false,
}));

app.post('/post/:id', async (req, res) => {
  const userId = +req.params.id;
  const post = req.body.body;

  const createdPost = await userService.createPost(post, userId);

  return res.status(200).json(createdPost);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
