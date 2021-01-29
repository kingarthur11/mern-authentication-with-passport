const express = require('express');
const db = require('./model/dataBase')
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session')
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const app = express();
const {
  PORT, SESSION_SECRET
} = process.env;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true}
}))
app.use(cookieParser("arthur"))
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);

db.mongoose.connect(db.url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to database...');
}).catch(err => {
  console.log('unable to connect to database', err);
  process.exit();
});


app.listen(PORT || 4000, function(){
    console.log('app is listening on port 4000');
})