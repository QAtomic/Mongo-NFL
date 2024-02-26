const mongoose = require('mongoose')
const validator = require('validator')

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return validator.isAlpha(value, ["en-US"], {ignore:" "})
            }, 
            message : "City must be alphabetical"
        }
    },
    conference: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return value=='AFC' || value=='NFC'
            },
            message : "Conference must be AFC or NFC"
        }
    },
    division: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('teams', teamSchema)