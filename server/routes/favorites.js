const router = require('express').Router();
const favorites = require('../models/favorites_model')

router.get('/', async (req, res) => {
    try {
        const result = await favorites.getAll()
        console.log(result)
        res.json(result)
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
})

router.get('/:username', async (req, res) => {
    try {
        const result = await favorites.getByUsername(req.params.username)
        console.log(result)
        res.json(result)
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
    
})

router.post('/', async (req, res) => {
    try {
        const result = await favorites.add(req.body)
        res.status(201).json(result)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await favorites.delete(req.params.id)
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = router;