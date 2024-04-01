import { SearchBar } from "../../components/SearchBar"
import { MovieCard } from "../../components/MovieCard"
import { Container, useMantineTheme, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Carousel } from '@mantine/carousel'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {getTrending()}
    return () => {
        isMounted = false
    }
  }, [])

  const getTrending = async () => {
    const data = await fetch(
        'http://localhost:8000/search/trending'
    )
    const searchResults = await data.json()
    setMovies(() => searchResults.results)
    console.log("Trending movies fetched")
  }

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const slides = movies.map((item) => (
      <Carousel.Slide key={item.id}>
          <MovieCard movie={item} />
      </Carousel.Slide>
  ))

  return (
    <Container size="xl" mt="lg">
      <Container size="sm">
        <form onSubmit={(e) => {e.preventDefault(); navigate("/search")}}>
          <SearchBar 
            placeholder="Search movies and TV shows"
            value={searchText} onChange={e => setSearchText(e.target.value)} 
          />
        </form>
      </Container>
      <h2>Trending movies</h2>
      <Carousel
        slideSize={{ base: '33.333%', sm: '20%' }}
        slideGap={{ base: 'md', sm: 'xl' }}
        align="start"
        slidesToScroll={mobile ? 3 : 5}
        controlSize={30}
      >
      {slides}
      </Carousel>
    </Container>
  )
}
