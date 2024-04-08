const token = process.env.TMDB_KEY;
const genresURL = "https://api.themoviedb.org/3/genre/";
const movieProvidersURL =
  "https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=FI";
const serieProvidersURL =
  "https://api.themoviedb.org/3/watch/providers/tv?language=en-US&watch_region=FI";
const popularMoviesURL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const trendingMoviesURL =
  "https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1&sort_by=popularity.desc";
const trendingTVShowsURL =
  "https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1&sort_by=popularity.desc";
const searchMoviesURL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=";
const searchMultiURL =
  "https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&query=";
const discoverMovieURL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc";
const searchPeopleURL =
  "https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1&query=";
const movieDetailsURL = "https://api.themoviedb.org/3/movie/";
const movieImagesURL = "https://api.themoviedb.org/3/movie/";
const TVDetailsURL = "https://api.themoviedb.org/3/tv/";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: token,
  },
};

const fetchData = (URL) => {
  return fetch(URL, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((json) => {
      return json;
    })
    .catch((err) => {
      throw err;
    });
};

const tmdb = {
  getGenres: (mediaType) => {
    const URL = genresURL + mediaType + "/list?language=en";
    console.log(URL);
    return fetchData(URL);
  },
  getProviders: (filter) => {
    if (filter === "movie") {
      return fetchData(movieProvidersURL);
    } else if (filter === "tv") {
      return fetchData(serieProvidersURL);
    }
  },
  getPopularMovies: () => {
    return fetchData(popularMoviesURL);
  },
  getTrendingMovies: () => {
    console.log("Trending movies fetched from:");
    console.log(trendingMoviesURL);
    return fetchData(trendingMoviesURL);
  },
  getTrendingTV: () => {
    console.log("Trending movies fetched from:");
    console.log(trendingTVShowsURL);
    return fetchData(trendingTVShowsURL);
  },
  getTopRated: (type) => {
    const URL = `https://api.themoviedb.org/3/${type}/top_rated?language=en-US&page=1`;
    console.log("Trending movies fetched from:");
    console.log(URL);
    return fetchData(URL);
  },
  searchMovies: (title) => {
    const URL = searchMoviesURL + title;
    console.log("Movies searched from:");
    console.log(URL);
    return fetchData(URL);
  },
  searchMulti: (title) => {
    const URL = searchMultiURL + title;
    console.log("Searched from:");
    console.log(URL);
    return fetchData(URL);
  },
  discoverMedia: (filters) => {
    let URL = `https://api.themoviedb.org/3/discover/${filters.type}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`;
    if (filters.page) {
      URL += `&page=${filters.page}`;
    }
    if (filters.genre) {
      URL += `&with_genres=${filters.genre}`;
    }
    if (filters.provider) {
      URL += `&watch_region=FI&with_watch_providers=${filters.provider}`;
    }
    if (filters.tvtype) {
      URL += `&with_type=${filters.tvtype}`;
    }
    if (filters.tvstatus) {
      URL += `&with_status=${filters.tvstatus}`;
    }

    let peopleIds = [];
    if (filters.actor) {
      peopleIds.push(filters.actor);
    }
    if (filters.director) {
      peopleIds.push(filters.director);
    }
    if (peopleIds.length > 0) {
      URL += `&with_people=${peopleIds.join(",")}`;
    }

    console.log(URL);
    return fetchData(URL);
  },
  searchPeople: (name) => {
    const URL = searchPeopleURL + name;
    console.log(URL);
    return fetchData(URL);
  },
  getMovieDetails: (id) => {
    const URL = movieDetailsURL + id;
    return fetchData(URL);
  },
  getTVDetails: (id) => {
    const URL = TVDetailsURL + id;
    return fetchData(URL);
  },
  getMovieImages: (id) => {
    const URL = movieImagesURL + id + "/images?language=EN%2Cnull";
    console.log("Images fetched from:");
    console.log(URL);
    return fetchData(URL);
  },
  getMovieCredits: (id) => {
    const URL = movieDetailsURL + id + "/credits?language=EN";
    console.log("Credits fetched from:");
    console.log(URL);
    return fetchData(URL);
  },
  getTVCredits: (id) => {
    const URL = TVDetailsURL + id + "/credits?language=EN";
    console.log("Credits fetched from:");
    console.log(URL);
    return fetchData(URL);
  },
  getTVImages: (id) => {
    const URL = TVDetailsURL + id + "/images?language=EN%2Cnull";
    console.log("Images fetched from:");
    console.log(URL);
    return fetchData(URL);
  },
};

module.exports = tmdb;
