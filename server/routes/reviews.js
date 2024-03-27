const router = require('express').Router();
const reviews = require('../models/reviews_model')

router.get('/', async (req, res) => {
    try {
        const result = await reviews.getAll()
        console.log(result)
        res.json(result)
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
})

router.get('/user/:username', async (req, res) => {
    try {
        const result = await reviews.getByUsername(req.params.username)
        console.log(result)
        res.json(result)
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
    
})

router.get('/media/:mediaId', async (req, res) => {
    try {
        const result = await reviews.getByMediaId(req.params.mediaId)
        console.log(result)
        res.json(result)
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const result = await reviews.add(req.body)
        res.status(201).json(result)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
})

router.put('/', async (req, res) => {
    try {
        const result = await reviews.update(req.body)
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await reviews.delete(req.params.id)
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = router;
