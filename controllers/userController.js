const userModel = require('../models/userModel.js')




//==================  Create a User  ==================//

const createUser = async (req, res) => {
    try {
        let { firstName, lastName, reminderTime, reminderTask, messages, mobileNumber } = req.body

        if (!firstName || typeof firstName != "string") return res.status(400).json({ message: "First Name is required!" })
        if (!lastName || typeof lastName != "string") return res.status(400).json({ message: "Last Name is required!" })
        if (!reminderTime || typeof reminderTime != "string") return res.status(400).json({ message: "Reminder Time is required!" })
        if (!reminderTask || typeof reminderTask != "string") return res.status(400).json({ message: "Reminder Task is required!" })
        if (messages.length == 0 || typeof messages != "object") return res.status(400).json({ message: "Messages are required!" })
        if (!mobileNumber || typeof mobileNumber != "string") return res.status(400).json({ message: "mobileNumber is required!" })


        await userModel.create(req.body)
        return res.status(200).json({ data: req.body })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
};





module.exports = { createUser }