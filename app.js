require("dotenv").config()
const express = require("express")
const app = express()
const winston = require('winston')
const expressWinston = require('express-winston')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const engineRoute = require("./routes/engineRoute")




app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));





//===============  Mongo DB Connection  ================//

mongoose.connect(
  process.env.mongoDBurl,
  {
    useNewUrlParser: true,
  }
)  
.then(() => console.log("MongoDb is connected."))
.catch( err => console.log(err));







//======================  Loggers  ==========================//

app.use(expressWinston.logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: 'info.log'
      })
    ],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.timestamp(),
      winston.format.prettyPrint(),
    ),
    meta: true,
    colorize: true
  }))




  app.use("/smsReminders/users", userRoutes)
  app.use("/smsReminders/engine", engineRoute)





  app.listen(process.env.PORT || 1310, function () {
    console.log("Express app running on port " + (process.env.PORT || 1310));
  });