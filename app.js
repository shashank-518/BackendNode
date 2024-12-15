const express = require("express")
const bodyParser = require("body-parser")
const HttpError = require("./models/htttp-error")
const PlacesRoute = require("./Routes/places-routes")


const app = express()


app.use(bodyParser.json())

app.use('/api/places' , PlacesRoute)

app.use((req,res)=>{
    const Error =new  HttpError("No Route defined" , 404)
    throw(Error)
})


app.use((error,req,res,next)=>{

    if(res.headerSent){
        return next(error)
    }

    res.status(error.code || 500).json({message : error.message || "An Unexpected error occurred"})

})

app.listen(5000)


