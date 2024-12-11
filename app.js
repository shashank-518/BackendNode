const express = require("express")
const bodyParser = require("body-parser")

const PlacesRoute = require("./Routes/places-routes")

const app = express()

app.use('/api/places' , PlacesRoute)

app.use((error,req,res,next)=>{

    if(res.headerSent){
        return next(error)
    }

    res.status(error.code || 500).json({message : error.message || "An Unexpected error occurred"})

})

app.listen(5000)


