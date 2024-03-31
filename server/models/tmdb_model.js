const token = process.env.token
const movieGenresURL ='https://api.themoviedb.org/3/genre/movie/list?language=en'
const serieGenresURL = 'https://api.themoviedb.org/3/genre/tv/list?language=en'
const movieProvidersURL = 'https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=FI'
const serieProvidersURL = 'https://api.themoviedb.org/3/watch/providers/tv?language=en-US&watch_region=FI'
const popularMoviesURL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
const trendingMoviesURL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1&sort_by=popularity.desc'
const searchMoviesURL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query='
const searchMultiURL = 'https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&query='
const discoverMovieURL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
const searchPeopleURL = 'https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1&query='
const movieDetailsURL = 'https://api.themoviedb.org/3/movie/'

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token
    }
}

const fetchData = (URL) => {
    return fetch(URL, options)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok')
        }
        return res.json()
    })
    .then(json => {
        return json
    })
    .catch(err => {
        throw err
    })
}

const tmdb = {
    getMovieGenres: () => {
        return fetchData(movieGenresURL)
    },
    getTVGenres: () => {
        return fetchData(serieGenresURL)
    },
    getProviders: (filter) => {
        if (filter === 'movies') {
            return fetchData(movieProvidersURL)
        } else if (filter === 'series') {
            return fetchData(serieProvidersURL)
        }
    },
    getPopularMovies: () => {
        return fetchData(popularMoviesURL)
    },
    getTrendingMovies: () => {
        console.log('Trending movies fetched from:')
        console.log(trendingMoviesURL)
        return fetchData(trendingMoviesURL)
    },
    searchMovies: (title) => {
        const URL = searchMoviesURL + title
        console.log('Movies searched from:')
        console.log(URL)
        return fetchData(URL)
    },
    searchMulti: (title) => {
        const URL = searchMultiURL + title
        console.log('Searched from:')
        console.log(URL)
        return fetchData(URL)
    },
    discoverMovies: (filters) => {
        let URL = discoverMovieURL
        if (filters.genre) {URL += `&with_genres=${filters.genre}`}
        if (filters.provider) {URL += `&with_watch_providers=${filters.provider}`}
        if (filters.people) {URL += `&with_people=${filters.people}`}
        console.log(URL)
        return fetchData(URL)
    },
    searchPeople: (name) => {
        const URL = searchPeopleURL + name
        console.log(URL)
        return fetchData(URL)
    },
    getMovieDetails: (id) => {
        const URL = movieDetailsURL + id
        return fetchData(URL)
    }
}

module.exports = tmdb
