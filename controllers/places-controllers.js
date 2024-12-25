const HttpError = require("../models/htttp-error")
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require("express-validator")
const getgeolocation  = require('../utils/geolocation')
const Place = require('../models/place');
const place = require("../models/place");


let DUMMY_VALUES = [
    {
      id: "p1",
      title: "Burj Khalifa",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yfKNUZIfC9qe-Vz5SkVWSpPhDONel-ek-A&s",
      address:
        "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
      descrption:
        "The Burj Khalifa is a skyscraper in Dubai, United Arab Emirates. It is the worlds tallest structure.",
      location: {
        lat: 25.197197,
        long: 55.2743764,
      },
      creator: "u1",
    },
    {
      id: "p2",
      title: "Burj... Khalifa",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yfKNUZIfC9qe-Vz5SkVWSpPhDONel-ek-A&s",
      address:
        "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
      descrption:
        "The Burj Khalifa is a skyscraper in Dubai, United Arab Emirates. It is the worlds tallest structure.",
      location: {
        lat: 25.197197,
        long: 55.2743764,
      },
      creator: "u2",
    },
  ];





const getPlacebyId = async (req,res,next)=>{
    const id = req.params.pid;

    let place;

    try{
      place =  await Place.findById(id)
    }catch(err){
      const error = new HttpError("There Was an errror", 404)
      next(error)
    }


    if(!place){
        return next(new HttpError('Could not find the place with this placeId' , 404))
    }


    res.json({place : place.toObject({getters: true})});

}

const getPlacesbyUserId = async (req,res,next)=>{
    const uid = req.params.uid;

    let places;

    try {
      places = await Place.find({creator : uid})
    }
    catch(err){
      return next(new HttpError('There was an error', 404))
      
    }

    if(!places || places.length === 0 ){
        return next(new HttpError('Could not find the place with this UserId' , 404))
    }


    res.json({places : places.map(place => place.toObject({getters:true}))}) 

}

const createPlaces = async (req,res,next)=>{

    const error = validationResult(req);
    if(!error.isEmpty()){
      // console.log(error)
      return next( new HttpError("Please Try again Pasiing the correct Input" , 422))
    }

    const {title,address,descrption,creator} = req.body;

    let coordinate;

    try {
      coordinate = await getgeolocation(address)
    } catch (error) {
      return next(error)
    }


    const createdplace = new Place({
      title,
      descrption,
      address,
      location:coordinate,
      imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yfKNUZIfC9qe-Vz5SkVWSpPhDONel-ek-A&s",
      creator
    })

    // console.log(createdplace)

    try{
      createdplace.save()
    }catch(e){
      const error = new HttpError("An error has occured", 404)
      next(error)
    }
    res.status(201).json({place : createdplace})

}


const updatePlace = async (req,res,next)=>{


  const err = validationResult(req);

  if(!err.isEmpty()){
    console.log(err);
    throw new HttpError("Error Occured while updating Place", 422);
  }

  const { title, descrption} = req.body;
  const uid = req.params.uid;



  let updatedPlace;

  try{
    updatedPlace = await Place.findById(uid)
  }
  catch(err){
    const error = new HttpError("Some Error in finding a place",404);
    next(error)
  }
  

  updatedPlace.title = title;
  updatedPlace.descrption = descrption;

  try{
    await updatedPlace.save()
  }catch(err){
    const error = new HttpError("Some Error in updating a place a place",404);
    next(error)
  }
  
  
  res.status(200).json({place : updatedPlace.toObject({getters:true})})
  
}

const deletePlace = (req,res,next)=>{
  const placeId = req.params.uid;

  if(!DUMMY_VALUES.find(p=>p.id === placeId)){
      throw new HttpError("Could not find the place by this id" , 422)
  }

  DUMMY_VALUES = DUMMY_VALUES.filter(p => p.id !== placeId)

  res.status(200).json({message : "Deleted Place"})

}

exports.getPlacebyId = getPlacebyId;
exports.getPlacesbyUserId = getPlacesbyUserId;
exports.createPlaces = createPlaces;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
