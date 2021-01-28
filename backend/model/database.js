const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/user-auth-with-passport'

const db = {}
db.mongoose = mongoose;
db.url = url;
db.user = require('./user')(mongoose)

module.exports = db;