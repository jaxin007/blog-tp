const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { userService } = require('../services/index');
const checkPasswords = require('./bcrypt');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  await userService.getUserById(id).then((err, user) => done(err, user));
});

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    await userService.getUserByData({ username })
      .then((user) => {
        if (!user) return done(null, false, { message: 'Wrong username or password' });
        try {
          if (!checkPasswords(`${password}`, `${user.password}`)) {
            return done(null, false);
          }
        } catch (err) {
          console.error(err);
          return done(null, false);
        }
        return done(null, user);
      });
  } catch (err) {
    console.error(err);
  }
}));
