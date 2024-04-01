import { Button, Image } from '@mantine/core'
import classes from './MovieCard.module.css'
import noimage from '../../assets/no-image.jpg'

export default function MovieCard({ movie }) {
    const baseURL = 'https://image.tmdb.org/t/p/w500'

    return (
        <div className={classes.cardContainer}>
            <Image 
                src={movie.poster_path === null ? noimage : baseURL + movie.poster_path} 
                className={classes.image}
            />
        </div>
    )
}