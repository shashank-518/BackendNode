const HttpError = require("../models/htttp-error");
const { validationResult } = require("express-validator");
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PRIVATE_KEY = process.env.TOKEN_PRIVATE;

const getusers = async (req, res, next) => {
  let users;

  try {
    users = await user.find({}, "-password");
  } catch (e) {
    const err = new HttpError("There is an error fetching your detail", 404);
    return next(err);
  }

  const usermap = users.map((user) => user.toObject({ getters: true }));

  res.json({ users: usermap });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    const err = new HttpError("There Was an error creating new User", 500);
    next(err);
  }

  let existingUser;
  try {
    existingUser = await user.findOne({ email: email });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new user({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    place: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      PRIVATE_KEY,
      { expiresIn: "1h" }
    );
  } catch (e) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ user: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await user.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    return next(
      new HttpError(
        "The credentail are wrong please check and re-try later",
        404
      )
    );
  }

  let isPasswordValid = false;

  try {
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  } catch (e) {
    const err = new HttpError("There Was an error logging you", 500);
    return next(err);
  }
  if (!isPasswordValid) {
    const err = new HttpError(
      "Invalid Creditinals , could not log you in.",
      401
    );
    return next(err);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      PRIVATE_KEY,
      { expiresIn: "1h" }
    );
  } catch (e) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.json(
    { user: existingUser.id, email: existingUser.email, token: token }
    );
};

exports.getusers = getusers;
exports.signup = signup;
exports.login = login;
