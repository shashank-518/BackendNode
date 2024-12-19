const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/htttp-error');



const DUMMY_VALUES = [
    {
        id:'u1',
        name:"Shashank",
        email:"test@123.com",
        password:"testers"
    },
];

const getusers = (req,res,next)=>{
    res.json({users :DUMMY_VALUES})
}

const signup = (req,res,next)=>{

    const {name , email , password} = req.body;

    const hasUser = DUMMY_VALUES.find(u => u.email === email)

    if(hasUser){
        throw new HttpError("User already Exists please try with different email", 422);
    }

    const userCreated = {
        id: uuidv4(),
        name,
        email,
        password
    }

    DUMMY_VALUES.push(userCreated);

    res.status(201).json({user: userCreated})

}

const login = (req,res,next)=>{

    const {email, password} = req.body;

    const identifiedUser = DUMMY_VALUES.find(p => p.email === email)

    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError("The credentail are wrong please check and re-try later", 404)
    }

    res.json({message : "Logged In"})

}

exports.getusers = getusers;
exports.signup = signup;
exports.login = login;