import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RowCards from "./RowCards";

export default function AllSearchResults() {
    const [allSearchResults, setAllSearchResults] = useState({});
    const {searchTerm} = useParams()
    const {genre} = useParams()
    const {pageNum} = useParams()

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
        movieCards = allSearchResults.results.map(movie => {
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
        if (allSearchResults.page>1) {
            let backNum = Number(pageNum)-1
            backButton =
                <div className="backbutton navbuttoncontainer">
                    <Link 
                        to={`/allresults/${genre}/${searchTerm}/${backNum}`}
                        className="searchbutton"
                    >
                        Back
                    </Link>
                </div>
        }
        if (allSearchResults.page<allSearchResults.total_pages) {
            let nextNum = Number(pageNum)+1
            nextButton = 
                <div className="nextbutton navbuttoncontainer">
                    <Link
                        to={`/allresults/${genre}/${searchTerm}/${nextNum}`}
                        className="searchbutton"
                    >
                        Next
                    </Link>
                </div>
        }
    }

    // eslint-disable-next-line
    useEffect(() => fetchMovieData(), [pageNum])

    return (
        <>
            <h2>All Search Results for {searchTerm}</h2>
            <div className="searchbodynav">
                <div className="navbuttons">
                    {backButton}{nextButton}
                </div>
                <div className="searchbodywrapper">
                    <div className="searchbodycards">
                        {movieCards}
                    </div>
                </div>
            </div>
        </>
    )
}
