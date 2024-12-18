const HttpError = require("../models/htttp-error")
const { v4: uuidv4 } = require('uuid');



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





const getPlacebyId = (req,res,next)=>{
    const id = req.params.pid;

    const place = DUMMY_VALUES.find(p => id === p.id);


    if(!place){
        return next(new HttpError('Could not find the place with this placeId' , 404))
    }


    res.json({place})

}

const getPlacesbyUserId = (req,res,next)=>{
    const uid = req.params.uid;

    const places = DUMMY_VALUES.filter(u=> uid === u.creator)

    if(!places || places.length === 0 ){
        return next(new HttpError('Could not find the place with this UserId' , 404))
    }


    res.json({places}) 

}

const createPlaces = (req,res,next)=>{
    const {title,address,descrption,coordinate,creator} = req.body;

    console.log(coordinate)

    const createdplace = {
      id: uuidv4(),
      title,
      address,
      descrption,
      location :coordinate,
      creator
    }

    console.log(createdplace)

    DUMMY_VALUES.push(createdplace)

    res.status(201).json({place : createdplace})

}


const updatePlace = (req,res,next)=>{

  const {title , descrption} = req.body;
  const uid = req.params.uid;

  const updatedPlace = {...DUMMY_VALUES.find(p => p.id === uid)}
  console.log(updatedPlace)
  const placeIndex = DUMMY_VALUES.findIndex(p=>p.id === uid)

  updatedPlace.title = title;
  updatedPlace.descrption = descrption;

  DUMMY_VALUES[placeIndex] = updatedPlace;
  
  res.status(200).json({message:"Successfull"})
  
}

const deletePlace = (req,res,next)=>{
  const placeId = req.params.uid;
  DUMMY_VALUES = DUMMY_VALUES.filter(p => p.id !== placeId)

  res.status(200).json({message : "Deleted Place"})

}

exports.getPlacebyId = getPlacebyId;
exports.getPlacesbyUserId = getPlacesbyUserId;
exports.createPlaces = createPlaces;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
