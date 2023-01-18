import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Movie from "./Movie";
import SearchResults from "./SearchResults";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movieResults, setMovieResults] = useState({});
    const [tvResults, setTVResults] = useState({});
    const [searchHeader, setSearchHeader] = useState("")
    const {id} = useParams()
    const handleFormChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const clearSearch = (event) => {
        if (event) {event.preventDefault();}
        setTVResults({})
        setMovieResults({})
        setSearchTerm("")
        const moviesearchurl = 
            "https://api.themoviedb.org/3/movie/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false&page="
        setMovieResults(fetch(moviesearchurl)
            .then(response => response.json())
            .then((json) => {
                setMovieResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })
        )
        const tvsearchurl = 
            "https://api.themoviedb.org/3/tv/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false&page="
        setTVResults(fetch(tvsearchurl)
            .then(response => response.json())
            .then((json) => {
                setTVResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })
        )
    }
    const submitSearch = (event) => {
        event.preventDefault();
        if (!searchTerm) {
            clearSearch()
        }
        const moviesearchurl = 
            `https://api.themoviedb.org/3/search/movie?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=${searchTerm}&include_adult=false`
        setMovieResults(fetch(moviesearchurl)
            .then(response => response.json())
            .then((json) => {
                setMovieResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })
        )
        console.log(searchTerm);
        const tvsearchurl = 
            `https://api.themoviedb.org/3/search/tv?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=${searchTerm}&include_adult=false`
        setTVResults(fetch(tvsearchurl)
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
    useEffect(() => clearSearch(), [id])
    return (
        <>
            <form className="searchform row">
                <div>
                    <input
                        className="textbox"
                        type="text"
                        name="name"
                        placeholder="search for movies, tv shows or people"
                        onChange={handleFormChange}
                        value={searchTerm}
                    >
                    </input>
                </div>
                <button
                    className="searchbutton"
                    onClick={submitSearch}
                >
                    Search
                </button>
                <Link to=""
                    className="searchbutton"
                >
                    Home
                </Link>
            </form>
            <Routes>
                <Route path="/" element={<SearchResults searchHeader={searchHeader} movieResults={movieResults} tvResults={tvResults} />} />
                <Route path="/:genre/:id" element={<Movie />} />
            </Routes>
        </>
    );
}