const express = require('express')
const router = express.Router()

const Player = require('../../models/Player')

router.get('/players', async (req,res) => {
    console.log("Get All Players API Called")
    try {
        const players = await Player.find()
        res.json(players)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/players/:id', getPlayer, (req,res) => {
    console.log("Get One Player API Called")
    res.send(res.player)
})


router.post('/players', async (req,res) => {
    console.log("Post Player API Called")
    const player = new Player({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        team: req.body.team,
        position: req.body.position,
        age: req.body.age,
        totalYards2023: req.body.totalYards2023,
        touchdowns2023: req.body.touchdowns2023
    })

    try {
        const newPlayer = await player.save()
        res.status(201).json(newPlayer)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})


router.patch('/players/:id', getPlayer, async (req,res) => {
    console.log('Patch Player API Called')
    if (req.body.firstName != null) {
        res.player.firstName = req.body.firstName
    }
    if (req.body.lastName != null) {
        res.player.lastName = req.body.lastName
    }
    if (req.body.team != null) {
        res.player.team = req.body.team
    }
    if (req.body.position != null) {
        res.player.position = req.body.position
    }
    if (req.body.age != null) {
        res.player.age = req.body.age
    }
    if (req.body.totalYards2023 != null) {
        res.player.totalYards2023 = req.body.totalYards2023
    }
    if (req.body.touchdowns2023 != null) {
        res.player.touchdowns2023 = req.body.touchdowns2023
    }

    try {
        const updatedPlayer = await res.player.save()
        res.json(updatedPlayer)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})


router.delete('/players/:id', getPlayer, async (req,res) => {
    console.log('Delete Player API Called')
    try {
        await res.player.deleteOne()
        res.json({ message: 'Player Deleted' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


async function getPlayer(req, res, next) {
    let player
    try {
        player = await Player.findById(req.params.id)
        if (player == null) {
            return res.status(404).json({ message: 'Cannot find player' })
        } 
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.player = player
    next()
}


module.exports = router