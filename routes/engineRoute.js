const express = require('express');
const router = express.Router();
const smsEngine = require("../smsEngine/engine")




router.get("/smsEngine", smsEngine.interval)







//====================================  Invalid API  ==========================================//
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you requested is not available!"
    })
})


module.exports = router;