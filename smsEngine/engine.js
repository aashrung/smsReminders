const userModel = require('../models/userModel')
const accountSid = process.env.twilioAccountSid;
const authToken = process.env.twilioAuthToken;
const client = require('twilio')(accountSid, authToken, {
    lazyLoading: false,
  });
const twilioSms = require('./twilio')






//====================  The Interval  ========================//

const interval = async (req, res) => {
    try {
        await timeOut()
        
        setInterval(async () => {
            await timeOut()
        }, process.env.intervalTime)

        return res.status(200).json({ message: "Jobs have started scheduling!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
};










//====================  The Timeout  =================//

const timeOut = async () => {
    try {
        await userModel.updateMany({ activeUser: true }, { smsSentToday: false }, { new: true })

        let userDetails = await userModel.find({ activeUser: true, smsSentToday: false })
        let count = 0

        for (let i = 0; i < userDetails.length; i++) {

            let now = new Date();
            let timeString = userDetails[i].reminderTime
            let [hours, minutes] = timeString.split(":")

            let targetTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                parseInt(hours),
                parseInt(minutes)
            );

            let milliseconds = targetTime.getTime();

            let random = Math.floor(Math.random() * userDetails[i].messages.length)

            setTimeout(async () => {
                 await twilioSms.sendSms(userDetails[i].messages[random], userDetails[i].mobileNumber, process.env.senderNumber, userDetails[i].firstName, userDetails[i].lastName, userDetails[i].reminderTask);
            }, milliseconds - Date.now())

            count++
        }


        client.messages
        .create({
            body: `Tasks scheduled for ${count} users!`,
            to: "+918208296031",
            from: process.env.senderNumber,
        })
        .then((message) => console.log("Sent to Aashrun"));


        return 
    } catch (error) {
        console.log(error)
    }
};






module.exports = { interval }





