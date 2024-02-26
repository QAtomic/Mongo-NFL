const mongoose = require('mongoose')
const validator = require('validator')

const playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, 
        validate : [validator.isAlpha, "First Name must only contain letters"]
    },
    lastName: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true, 
        validate: [validator.isAlphanumeric, "Team must be alphanumeric"]
    },
    position: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return ["WR","RB","TE","QB"].includes(value)
            },
            message : "Must enter valid position"
        }
    },
    age: {
        type: Number,
        required: false,
        min: [1, "Age must be greater than 0"],
        max : [99, "Age must be less than 100"]
    },
    totalYards2023: {
        type: Number,
        required: false
    },
    touchdowns2023: {
        type: Number,
        required: false, 
        min : [0, "Touchdowns must be 0 or greater"]
    }
})

module.exports = mongoose.model('players', playerSchema)