const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { findUserByUsername } = require('./models/user');
passport.use(
 new LocalStrategy(async (username, password, done) => {
 try {
 const user = await findUserByUsername(username);
 if (!user) {
 return done(null, false, { message: 'Incorrect username.' });
 }
 const passwordMatch = await bcrypt.compare(password, user.password);
 if (!passwordMatch) {
 return done(null, false, { message: 'Incorrect password.' });
 }
 return done(null, user);
 } catch (error) {
 return done(error);
 }
 })
);
passport.serializeUser((user, done) => {
 done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
 try {
 const user = await findUserById(id);
 done(null, user);
 } catch (error) {
 done(error);
 }
});