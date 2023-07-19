const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Recipe'
    },

})

module.exports = mongoose.model('Comment', commentSchema)