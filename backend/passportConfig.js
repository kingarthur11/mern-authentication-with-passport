const User = require("./model/user");
const byCrypT = require('bcryptjs')
const localStrategy = require('passport-local').Strategy

module.exports = function (passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({username: username}, (err, user) => {
                if(err) throw err;
                if(!user) return done(null, false)
                byCrypT.compare(password, user.password, (err, result) => {
                    if(err) throw err;
                    if(result === true) {
                        return done(null, user);
                    }else {
                        return done(null, false)
                    }
                })
            })
        })
    )
    passport.serializeUser((user, cb) => {
        cb(null, user._id)
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, user) => {
            cb(err, user)
        })
    })
}