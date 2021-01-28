module.exports = app => {
    const UserCont = require("../controller/user");  
    var router = require("express").Router();

    router.post("/signup", UserCont.signup);
    router.post("/login", UserCont.login);
    router.get("/", UserCont.findAll);
    router.get("/:id", UserCont.findOne);
      
    app.use('/api/user', router);
  };