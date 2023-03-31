const express = require("express")
const fs = require('fs')
const router = express.Router()

// helper function to read the creature db
const readCreatures = () => {
    // read in the creatures json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    // convert to POJO (plain old javascript object)
    const creatureData = JSON.parse(creatures)
    return creatureData
}
readCreatures()

// GET /prehistoric_creatures -- READ displays all prehistoric creatures
router.get('/', (req, res) => {
    let creatures = readCreatures()
    console.log(req.query)

    if (req.query.creatureFilter) {
        creatures = creatures.filter(creature => {
            return creature.type.toLowerCase().includes(req.query.creatureFilter.toLowerCase())
        })
    }
    res.render('creatures/index.ejs', {
        creatures
    })
})

// GET /prehistoric_creatures/new -- SHOW form for adding new prehistoric creatures
router.get('/new', (req, res) => {
    res.render('creatures/new.ejs')
})

// POST /prehistoric_creatures -- CREATE a new creature for the db
router.post('/', (req, res) => {
    console.log(req.body)
    const creatures = readCreatures()

    creatures.push(req.body)
    
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatures))


    res.redirect('/prehistoric_creatures')
})

// GET /prehistoric_creatures/:id -- READ creature @ :id
router.get('/:id', (req, res) => {

    const creatures = readCreatures()
    
    const foundCreature = creatures[req.params.id]
    
    res.render('creatures/details.ejs', {
        creature: foundCreature,
        id: req.params.id
    })
})

module.exports = router