const {loginValidn, signupValidn} = require('../model/check')
const byCrypT = require('bcryptjs')
const passport = require('passport');
require('../passportConfig')(passport)
const User = require("../model/user");

exports.signup = async (req, res) => {
    const {username, password} = req.body;
    const salt = await byCrypT.genSalt(10);
    const hashPwd = await byCrypT.hash(password, salt)
    const {error} = signupValidn.validate(req.body)
    if (error) 
        return res.status(400).send(error.details[0].message);   
    else {
        const user = new User({
        username,
        password: hashPwd, 
            });
        user.save(user)
            .then(data => {
                res.send({user: user._id})
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "some error occured while creating user"
                })
            })
    }
};

exports.login = (req, res, next) => {
    console.log('happi')
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("no user in the database")
        else{ 
            req.login(user, err => {
                if(err) throw err;
                res.send('successfully authenticated')
            })
        }
    })(req, res, next)
        
};

exports.findAll = async (req, res) => {
     try {
         const user = await User.find({});
         res.send({users: user})
     } catch(error) {
         res.status(500).send({
             message: error.message || "soething went wrong"
         })
     }
 };

exports.findOne = async (req, res) => {
    const {id} = req.params;
    try {
        let data = await User.findById(id);
        res.send({user: data})        
    } catch (error) {
        res.status(500)
            .send({message: "error retrieving"})
    }
}
