const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")




router.post("/createUser", userController.createUser)







//====================================  Invalid API  ==========================================//
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you requested is not available!"
    })
})


module.exports = router;