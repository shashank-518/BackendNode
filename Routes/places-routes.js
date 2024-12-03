const exprees = require("express")

const router = exprees.Router()

router.get("/" , (req,res,next)=>{
    console.log("This is data");
    res.json({message : "Hello Signup done"})
})


module.exports = router