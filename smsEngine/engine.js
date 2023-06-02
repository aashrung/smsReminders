const userModel = require('../models/userModel')
const accountSid = process.env.twilioAccountSid;
const authToken = process.env.twilioAuthToken;
const client = require('twilio')(accountSid, authToken);
const twilioSms = require('./twilio')
const taskModel = require('../models/taskModel')






//====================  The Interval  ========================//

const interval = async (req, res) => {
    try {
        setInterval(scheduler, process.env.intervalTime)

        return res.status(200).json({ message: "Jobs have started scheduling!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
};










//===================  The Scheduler  ========================//

const scheduler = async () => {
    try {
        await userModel.updateMany({ activeUser: true }, { smsSentToday: false }, { new: true })

        timeOut()
            .then((count) => {client.messages
                .create({
                    body: `Tasks scheduled for ${count} users!`,
                    to: "+918208296031",
                    from: process.env.senderNumber,
                })})

        return "Success!"
    } catch (error) {
        console.log(error)
    }
};








//====================  The Timeout  =================//

const timeOut = async () => {
    try {
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

            let random = Math.floor(Math.random() * userDetails[i].messages.length + 1)

            setTimeout(() => {
                twilioSms.sendSms(userDetails[i].messages[random], userDetails[i].mobileNumber, process.env.senderNumber);
              }, milliseconds - Date.now())

            await taskModel.create({
                taskName: userDetails[i].reminderTask,
                sentDate: new Date(),
                mobileNumber: userDetails[i].mobileNumber,
                sentTime: new Date().toLocaleTimeString(),
                sentTo: userDetails[i].firstName + " " + userDetails[i].lastName
            })

            count++
        }

        return count
    } catch (error) {
        console.log(error)
    }
};






module.exports = { interval }





