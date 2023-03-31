const express = require("express")
const fs = require('fs')
const router = express.Router()

// helper function to read the creature db
const readCreatures = () => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    return creatureData
}
readCreatures()

// GET /prehistoric_creatures -- READ displays all prehistoric creatures
router.get('/creatures', (req, res) => {
    let creatures = readCreatures()
    console.log(req.query)

    if (req.query.creatureFilter) {
        creatures = creatures.filter(creature => {
            return creature.name.toLowerCase().includes(req.query.creatureFilter.toLowerCase())
        })
    }
    res.render('creatures/index.ejs', {
        creatures
    })
})
// GET /prehistoric_creatures/:id -- READ displays a single creature @ :id
router.get('/creatures/:id', (req, res) => {
    const creatures = readCreatures()
    const foundCreature = creatures[req.params.id]
    res.render('creatures/details.ejs', {
        creature: foundCreature,
        id: req.params.id
    })
})
// GET /prehistoric_creatures/new -- READ form for adding new prehistoric creatures
router.get('/creatures/new', (req, res) => {
    res.render('creatures/new.ejs')
})
// POST /prehistoric_creatures -- CREATE a new creature for the db
router.post('/creatures', (req, res) => {
    console.log(req.body)
    const creatures = readCreatures
    creatures.push(req.body)
    fs.writeFileSync('./creatures.json', JSON.stringify(creatures))
    res.redirect('/creatures')
})

module.exports = router