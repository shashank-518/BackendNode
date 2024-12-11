const exprees = require("express")
const placescontrollers = require("../controllers/places-controllers")

const router = exprees.Router()

router.get("/" , (req,res,next)=>{
    console.log("This is data");
    res.json({message : "Hello Signup done"})
})

router.get("/:pid" , placescontrollers.getPlacebyId)

router.get("/user/:uid" , placescontrollers.getPlacebyUserId)


module.exports = router