const express = require("express")
const bodyParser = require("body-parser")

const PlacesRoute = require("./Routes/places-routes")

const app = express()

app.use('/api/places' , PlacesRoute)

app.listen(5000)


