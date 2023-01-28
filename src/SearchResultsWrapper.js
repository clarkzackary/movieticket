import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchResults from "./FetchResults";

export default function SearchResultsWrapper({setSearchTerm, clearSearch, favResults, setFavResults}) {
    const [movieResults, setMovieResults] = useState({});
    const [tvResults, setTVResults] = useState({});
    const [personResults, setPersonResults] = useState({});
    const [searchHeader, setSearchHeader] = useState("")
    const {searchTerm} = useParams()
    const submitSearch = () => {
        if (!searchTerm) {
            clearSearch()
        }
        setMovieResults(fetch(`https://api.themoviedb.org/3/search/movie?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=${searchTerm}&include_adult=false`)
            .then(response => response.json())
            .then((json) => {
                setMovieResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })
        )
        setTVResults(fetch(`https://api.themoviedb.org/3/search/tv?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=${searchTerm}&include_adult=false`)
            .then(response => response.json())
            .then((json) => {
                setTVResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })
        )
        setPersonResults(fetch(`https://api.themoviedb.org/3/search/person?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=${searchTerm}&include_adult=false`)
            .then(response => response.json())
            .then((json) => {
                setPersonResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })
        )
        setSearchHeader(searchTerm)
        setSearchTerm("")
    }
    // eslint-disable-next-line
    useEffect(() => submitSearch(), [searchTerm])

    return (
        <>
            <h2>Search Results for: {searchHeader}</h2>
            <FetchResults results={movieResults.results} parentType="search" genre="movie" header="Movies" favResults={favResults} setFavResults={setFavResults}/>
            <FetchResults results={tvResults.results} parentType="search" genre="tv" header="TV Shows" favResults={favResults} setFavResults={setFavResults}/>
            <FetchResults results={personResults.results} parentType="search" genre="person" header="People" favResults={favResults} setFavResults={setFavResults}/>
        </>
    )
}
