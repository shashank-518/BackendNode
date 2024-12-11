const exprees = require("express")
const HttpError = require("../models/htttp-error")

const router = exprees.Router()

const DUMMY_VALUES = [
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

router.get("/" , (req,res,next)=>{
    console.log("This is data");
    res.json({message : "Hello Signup done"})
})

router.get("/:pid" , (req,res,next)=>{
    const id = req.params.pid;

    const place = DUMMY_VALUES.find(p => id === p.id);


    if(!place){
        return next(new HttpError('Could not find the place with this placeId' , 404))
    }


    res.json({place})

})

router.get("/user/:uid" , (req,res,next)=>{
    const uid = req.params.uid;

    const User = DUMMY_VALUES.find(u=> uid === u.creator)

    if(!User){
        return next(new HttpError('Could not find the place with this UserId' , 404))
    }


    res.json({User}) //{User: User} Both are same

})


module.exports = router