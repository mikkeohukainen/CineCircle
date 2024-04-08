const router = require('express').Router()
const tmdb = require('../models/tmdb_model')

router.get('/genres/:type', async (req, res) => {
    try {
        const result = await tmdb.getGenres(req.params.type)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/providers/:filter', async (req, res) => {
    try {
        const result = await tmdb.getProviders(req.params.filter)
        const filteredResult = result.results.map(provider => {
            return {
                provider_name: provider.provider_name,
                provider_id: provider.provider_id,
                logo_path: provider.logo_path
            }
        })
        res.json(filteredResult)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/popular', async (req, res) => {
    try {
        const result = await tmdb.getPopularMovies()
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/toprated/:type', async (req, res) => {
    try {
        const result = await tmdb.getTopRated(req.params.type)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/trending/movies', async (req, res) => {
    try {
        const result = await tmdb.getTrendingMovies()
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/trending/tv', async (req, res) => {
    try {
        const result = await tmdb.getTrendingTV()
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/movie/title/:title', async (req, res) => {
    try {
        const result = await tmdb.searchMovies(req.params.title)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/multi/title/:title', async (req, res) => {
    try {
        const result = await tmdb.searchMulti(req.params.title)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/multi/filter', async (req, res) => {
    try {
        const result = await tmdb.discoverMedia(req.query)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/people/name/:name', async (req, res) => {
    try {
        const result = await tmdb.searchPeople(req.params.name)
        const filteredResult = result.results.map(person => {
            return {
                name: person.name,
                original_name: person.original_name,
                id: person.id,
                path: person.profile_path,
                known_for_department: person.known_for_department
            }
        })
        res.json(filteredResult)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/movie/details/:id', async (req, res) => {
    try {
        const result = await tmdb.getMovieDetails(req.params.id)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/movie/images/:id', async (req, res) => {
    try {
        const result = await tmdb.getMovieImages(req.params.id)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/movie/credits/:id', async (req, res) => {
    try {
        const result = await tmdb.getMovieCredits(req.params.id)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/tv/images/:id', async (req, res) => {
    try {
        const result = await tmdb.getTVImages(req.params.id)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.get('/tv/credits/:id', async (req, res) => {
    try {
        const result = await tmdb.getTVCredits(req.params.id)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

module.exports = router
