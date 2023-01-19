import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchResults from "./SearchResults";

export default function SearchResultsWrapper({setSearchTerm, clearSearch}) {
    const [movieResults, setMovieResults] = useState({});
    const [tvResults, setTVResults] = useState({});
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
        setSearchHeader(searchTerm)
        setSearchTerm("")
    }
    // eslint-disable-next-line
    useEffect(() => submitSearch(), [searchTerm])

    return (
        <>
            <h2>Search Results for: {searchHeader}</h2>
            <SearchResults movieResults={movieResults} tvResults={tvResults} parentType="search" />
        </>
    )
}
