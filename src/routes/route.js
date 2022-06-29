const express = require('express');
const router = express.Router();
const CollegeController = require("../controllers/collegeController")
const InternController = require("../controllers/internController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
//---------------------Route For Creating College-----------------------------------//
router.post("/functionup/colleges", CollegeController.createCollege)

//--------------------Route For Creating Intern----------------------------------//
router.post("/functionup/interns", InternController.createIntern)

//---------------------Route For Displaying College Intern
router.get("/functionup/collegeDetails", CollegeController.getCollegeIntern)

module.exports = router;