const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../keys/keys");
const { userModel } = require("../database/schemas");

//////         Google Auth Strategy Configure

passport.use(new googleStrategy({
    clientID: keys.google.ClientID,
    clientSecret: keys.google.ClientSecret,
    callbackURL: "/api/login/google/callback"
}, (accessToken, refreshToken, Profile, callback) => {
    userModel.findOne({
        "googleID": Profile.id
    }, (err, user) => {
        if (err) {
            console.log("Error in finding the user");
            return callback(err, null)
        }
        if (user) {
            return callback(null, user);
        } else {
            let newUser = new userModel({
                googleID: Profile.id,
                userName: Profile.displayName,
                email: Profile._json.email,
                profilePic: Profile._json.picture,
            })
            newUser.save((err, user) => {
                if (err) {
                    console.log("Error occured during saving");
                    return callback(err, null);
                }
                return callback(null, user);
            })
        }
    })

}));

module.exports = {
    passport
}