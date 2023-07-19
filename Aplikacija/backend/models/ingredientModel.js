const mongoose = require('mongoose')

const ingredientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add the ingredient name!']
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Ingredient', ingredientSchema)