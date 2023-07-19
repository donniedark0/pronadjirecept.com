const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add the category name!']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Category', categorySchema)