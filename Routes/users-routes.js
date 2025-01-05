const express = require("express");
const { check } = require("express-validator");
const userscontrollers = require("../controllers/users-controllers");
const FileUpload = require("../middlewares/File-upload")

const router = express.Router();

router.get("/", userscontrollers.getusers);

router.post("/login", userscontrollers.login);

router.post(
  "/signup",
  FileUpload.single('image'),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({min:6}),
  ],
  userscontrollers.signup
); 

module.exports = router;
