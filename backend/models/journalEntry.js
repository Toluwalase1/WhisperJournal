const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        user_id: {
        type: String,
        required: true
         }
    },
    {timestamps: true}
)


const Journal = mongoose.model('Journal', journalSchema)
module.exports = Journal