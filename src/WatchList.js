import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RowCards from "./RowCards";

export default function WatchList(setFavResults) {
    const [watchListResults, setWatchListResults] = useState({});
    const {genre} = useParams()

    const fetchMovieData = () => {
        let fetchurl =
        `https://api.themoviedb.org/3/list/32914?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false`
        fetch(fetchurl)
            .then(response => response.json())
            .then(response => {
                setWatchListResults(response);
            })
    }

    let movieCards = (<></>)
    console.log(watchListResults)
    if (watchListResults.items) {
        movieCards = watchListResults.items.map(movie => {
            if (movie.poster_path || movie.profile_path) {
                return(
                    <RowCards movie={movie} movieurl={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.profile_path}`} genre={genre} key={movie.id} />
                )
            } else {
                let movieurl = `/images/empty.png`
                return (
                    <RowCards movie={movie} movieurl={movieurl} genre={genre} key={movie.id} />
                )
            }
        })
    }

    // eslint-disable-next-line
    useEffect(() => fetchMovieData(), [])

    return (
        <>
            <h2>Community Favorites</h2>
            <div className="searchbodywrapper">
                <div className="searchbodycards">
                    {movieCards}
                </div>
            </div>
        </>
    )
}
