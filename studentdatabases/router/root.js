const Router = require('express').Router();
const { passport } = require("../passport/serializeDeserialize");

Router.get("/login/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"], accessType: 'offline', passReqToCallback: true}));

Router.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/dashboard' }))

Router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/login');
})

module.exports = Router;