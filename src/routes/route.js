const express = require('express');
const router = express.Router();
const CollegeController = require("../controllers/collegeController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/functionup/college", CollegeController.createCollege)

module.exports = router;