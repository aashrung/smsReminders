const userModel = require('../models/userModel')
const accountSid = process.env.twilioAccountSid;
const authToken = process.env.twilioAuthToken;
const client = require('twilio')(accountSid, authToken);
const taskModel = require('../models/taskModel')







const sendSms = async (message, mobileNumber, sender, firstName, lastName, reminderTask) => {
    try {
         client.messages
            .create({
                body: message,
                to: mobileNumber,
                from: sender,
            })
            .then((message) => console.log(message.sid));


        await userModel.findOneAndUpdate({ mobileNumber }, { smsSentToday: true })

        await taskModel.create({
            taskName: reminderTask,
            sentDate: new Date(),
            mobileNumber: mobileNumber,
            sentTime: new Date().toLocaleTimeString(),
            sentTo: firstName + " " + lastName
        })

        return "Success"
    } catch (error) {
        console.log(error)
    }
};






module.exports = { sendSms }