const express = require("express");
const { check } = require("express-validator");
const userscontrollers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", userscontrollers.getusers);

router.post("/login", userscontrollers.login);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({min:6}),
  ],
  userscontrollers.signup
); 

module.exports = router;
