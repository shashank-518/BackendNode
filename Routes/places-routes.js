const exprees = require("express");
const { check } = require("express-validator");
const placescontrollers = require("../controllers/places-controllers");
const FileUpload = require("../middlewares/File-upload")

const router = exprees.Router();

router.get("/", (req, res, next) => {
  console.log("This is data");
  res.json({ message: "Hello Signup done" });
});

router.get("/:pid", placescontrollers.getPlacebyId);

router.get("/user/:uid", placescontrollers.getPlacesbyUserId);

router.post(
  "/",
  FileUpload.single('image'),
  [
    check("title").not().isEmpty(),
    check("descrption").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placescontrollers.createPlaces
);

router.patch("/:uid", [
    check('title').not().isEmpty(),
    check('descrption').isLength({min:5})
] ,  placescontrollers.updatePlace);

router.delete("/:uid", placescontrollers.deletePlace);

module.exports = router;
