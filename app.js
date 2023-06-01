require("dotenv").config()
const express = require("express")
const app = express()
const winston = require('winston')
const expressWinston = require('express-winston')


app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));




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
    msg: "id: {{req.id}}, client: {{req.client}}",
    colorize: true
  }))







  app.listen(process.env.PORT || 1310, function () {
    console.log("Express app running on port " + (process.env.PORT || 1310));
  });