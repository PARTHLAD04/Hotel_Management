const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');
const { compare } = require('bcrypt');

passport.use(new localStrategy(async (USERNAME, password, done) => {
  try {
    const user = await Person.findOne({ username: USERNAME });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    else {
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport;