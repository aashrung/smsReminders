const userModel = require('../models/userModel')
const accountSid = process.env.twilioAccountSid;
const authToken = process.env.twilioAuthToken;
const client = require('twilio')(accountSid, authToken);






const sendSms = async (message, mobileNumber, sender) => {
    try {
        client.messages
            .create({
                body: message,
                to: mobileNumber,
                from: sender,
            })
            .then((message) => console.log(message.sid));

        await userModel.findOneAndUpdate({ mobileNumber }, { smsSentToday: true })

        return "Success"
    } catch (error) {
        console.log(error)
    }
};






module.exports = { sendSms }