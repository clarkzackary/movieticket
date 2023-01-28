import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AllSearchResults from "./AllSearchResults";
import HomeResultsWrapper from "./HomeResultsWrapper";
import Movie from "./Movie";
import SearchResultsWrapper from "./SearchResultsWrapper";
import WatchList from "./WatchList";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movieResults, setMovieResults] = useState({});
    const [tvResults, setTVResults] = useState({});
    const [favResults, setFavResults] = useState({});
    const navigate = useNavigate()
    const handleFormChange = (event) => {
        setSearchTerm(event.target.value);
    }
    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            navigate(`/search/${searchTerm}`)
        }
    }
    const clearSearch = (event) => {
        if (event) {event.preventDefault();}
        setTVResults({})
        setMovieResults({})
        setSearchTerm("")
        setMovieResults(fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false&page=`)
            .then(response => response.json())
            .then((json) => {
                setMovieResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })
        )
        setTVResults(fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false&page=`)
            .then(response => response.json())
            .then((json) => {
                setTVResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })
        )
    }
    const fetchFavResults = () => {
        setFavResults({})
        setFavResults(fetch(`https://api.themoviedb.org/3/list/32914?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false`)
            .then(response => response.json())
            .then((json) => {
                setFavResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })
        )
    }

    useEffect(() => clearSearch(), [])
    useEffect(() => fetchFavResults(), [])
    
    return (
        <>
            <div className="header">
                <Link to="" className="homebutton">
                    <h1>
                        Moviegoer <i className="fa fa-ticket" />
                    </h1>
                </Link>
                <div className="searchform">
                    <input
                        className="textbox"
                        type="text"
                        name="name"
                        placeholder="search for movies, tv shows or people"
                        onChange={handleFormChange}
                        value={searchTerm}
                        onKeyDown={handleSubmit}
                    >
                    </input>
                    <Link to={`/search/${searchTerm}`} className="searchbutton">
                        Search
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<HomeResultsWrapper movieResults={movieResults} tvResults={tvResults} favResults={favResults} setFavResults={setFavResults}/>} />
                <Route path="/search" element={<HomeResultsWrapper movieResults={movieResults} tvResults={tvResults} favResults={favResults} setFavResults={setFavResults}/>} />
                <Route path="/search/:searchTerm" element={<SearchResultsWrapper setSearchTerm={setSearchTerm} clearSearch={clearSearch} favResults={favResults} setFavResults={setFavResults}/>} />
                <Route path="/allresults/:genre/:searchTerm/:pageNum" element={<AllSearchResults favResults={favResults} setFavResults={setFavResults}/>} />
                <Route path="/:genre/:id" element={<Movie setFavResults={setFavResults}/>} />
                <Route path="watchlist" element={<WatchList />} />
            </Routes>
        </>
    );
}