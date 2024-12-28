const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/htttp-error');
const {validationResult} = require("express-validator")
const user = require('../models/user');


const DUMMY_VALUES = [
    {
        id:'u1',
        name:"Shashank",
        email:"test@123.com",
        password:"testers"
    },
];

const getusers = async (req,res,next)=>{

    let users;

    try{
        users = await user.find({} , '-password')
    }catch(e){
        const err = HttpError("There is an error fetching your detail" , 404);
        return next(err)
    }

    const usermap = users.map((user) => user.toObject({getters:true}))

    res.json({users : usermap })
}

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { name, email, password} = req.body;
  
    let existingUser
    try {
      existingUser = await user.findOne({ email: email })
    } catch (err) {
        console.log(err)
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    
    if (existingUser) {
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    
    const createdUser = new user({
      name,
      email,
      image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
      password,
      place : []
    });
  
    try {
      await createdUser.save();
    } catch (err) {
        console.log(err)
      const error = new HttpError(
        'Signing up failed, please try again.',
        500
      );
      return next(error);
    }
  
    res.status(201).json({user: createdUser.toObject({ getters: true })});
  };

const login = async(req,res,next)=>{


    const {email, password} = req.body;

    let existingUser
    try {
      existingUser = await user.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }

    if(!existingUser || existingUser.password !== password){
       return  next(new HttpError("The credentail are wrong please check and re-try later", 404))
    }

    res.json({message : "Logged In"})

}

exports.getusers = getusers;
exports.signup = signup;
exports.login = login;