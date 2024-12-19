const exprees = require("express")
const userscontrollers = require("../controllers/users-controllers")


const router = exprees.Router()

router.get("/" , userscontrollers.getusers)

router.post("/login" , userscontrollers.login )

router.post("/signup" , userscontrollers.signup )


module.exports = router