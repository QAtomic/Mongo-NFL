const express = require('express')
const router = express.Router()

const Team = require('../../models/Team')


router.get('/teams', async (req,res) => {
    console.log('Get All Teams API Called')
    try {
        const teams = await Team.find()
        res.json(teams)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/teams/:id', getTeam, (req,res) => {
    console.log("Get One Team API Called")
    res.send(res.team)
})


router.post('/teams', async (req,res) => {
    console.log("Post Team API Called")
    const team = new Team({
        name: req.body.name,
        city: req.body.city,
        conference: req.body.conference,
        division: req.body.division
    })

    try {
        const newTeam = await team.save()
        res.status(201).json(newTeam)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})


router.patch('/teams/:id', getTeam, async (req,res) => {
    console.log('Patch Team API Called')
    if (req.body.name != null) {
        res.team.name = req.body.name
    }
    if (req.body.city != null) {
        res.team.city = req.body.city
    }
    if (req.body.conference != null) {
        res.team.conference = req.body.conference
    }
    if (req.body.division != null) {
        res.team.division = req.body.division
    }

    try {
        const updatedTeam = await res.team.save()
        res.json(updatedTeam)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})


router.delete('/teams/:id', getTeam, async (req,res) => {
    console.log('Delete Team API Called')
    try {
        await res.team.deleteOne()
        res.json({ message: 'Team Deleted' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


async function getTeam(req, res, next) {
    let team
    try {
        team = await Team.findById(req.params.id)
        if (team == null) {
            return res.status(404).json({ message: 'Cannot find team' })
        } 
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.team = team
    next()
}

module.exports = router