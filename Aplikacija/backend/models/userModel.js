const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name!']
        },
        email: {
            type: String,
            required: [true, 'Please add an email!']
        },
        password: {
            type: String,
            required: [true, 'Please add a password!']
        },
        imagePath: {
            default: "",
            type: String
        },
        role: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)