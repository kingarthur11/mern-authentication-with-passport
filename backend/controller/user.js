const {loginValidn, signupValidn} = require('../model/check')
const byCrypT = require('bcryptjs')
const db = require("../model/dataBase");
const User = db.user;

exports.signup = async (req, res) => {
    const {userName, password} = req.body;
    const salt = await byCrypT.genSalt(10);
    const hashPwd = await byCrypT.hash(password, salt)
    const {error} = signupValidn.validate(req.body)
    if (error) 
        return res.status(400).send(error.details[0].message);   
    else {
        const user = new User({
        userName,
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

exports.login = async (req, res) => {
    const {userName, password} = req.body;    
    const {error} = loginValidn.validate(req.body)
    if (error) 
        return res.status(400).send(error.details[0].message); 
    const passIsValid = byCrypT.compareSync(password, user.password);  
    if (!passIsValid) {
        return res.status(400).send('password is incorrect');   
    }
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
