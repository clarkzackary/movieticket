import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RowCards from "./RowCards";

export default function AllSearchResults() {
    const [allSearchResults, setAllSearchResults] = useState({});
    const {searchTerm} = useParams()
    const {genre} = useParams()
    const {pageNum} = useParams()


    console.log(searchTerm)
    console.log(genre)


    const fetchMovieData = () => {
        let fetchurl =
        `https://api.themoviedb.org/3/search/${genre}?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=${searchTerm}&include_adult=false&page=${pageNum}`
        fetch(fetchurl)
            .then(response => response.json())
            .then(response => {
                setAllSearchResults(response);
            })
    }

    let movieCards = (<></>)
    let backButton = (<></>)
    let nextButton = (<></>)
    if (allSearchResults.results) {
        console.log(allSearchResults)
        console.log(allSearchResults.total_pages)
        movieCards = allSearchResults.results.map(movie => {
            return(
                <RowCards movie={movie} movieurl={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.profile_path}`} genre={genre} key={movie.id} />
            )    
        })
        if (allSearchResults.page>1) {
            let backNum = Number(pageNum)-1
            backButton = 
                <Link to={`/allresults/${genre}/${searchTerm}/${backNum}`}>
                    Back
                </Link>
        }
        if (allSearchResults.page<allSearchResults.total_pages) {
            let nextNum = Number(pageNum)+1
            nextButton = 
                <Link to={`/allresults/${genre}/${searchTerm}/${nextNum}`}>
                    Next
                </Link>
        }
    }

    // eslint-disable-next-line
    useEffect(() => fetchMovieData(), [pageNum])

    return (
        <>
            <h2>Big Search</h2>
            {backButton}{nextButton}
            {movieCards}
        </>
    )
}
