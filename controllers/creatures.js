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
            return creature.type.toLowerCase().includes(req.query.creatureFilter.toLowerCase())
        })
    }
    res.render('creatures/index.ejs', {
        creatures
    })
})


// GET /prehistoric_creatures/new -- READ form for adding new prehistoric creatures
router.get('/prehistoric_creatures/new', (req, res) => {
    res.render('creatures/new.ejs')
})

// POST /prehistoric_creatures -- CREATE a new creature for the db
router.post('/prehistoric_creatures', (req, res) => {
    console.log(req.body)
    const creatures = readCreatures()

    creatures.push(req.body)
    
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatures))


    res.redirect('/prehistoric_creatures')
})

// GET /prehistoric_creatures/:id -- READ displays a single creature @ :id
router.get('/prehistoric_creatures/:id', (req, res) => {

    const creatures = readCreatures()
    
    const foundCreature = creatures[req.params.id]
    
    res.render('creatures/details.ejs', {
        creature: foundCreature,
        id: req.params.id
    })
})

module.exports = router