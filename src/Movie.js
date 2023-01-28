import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteButton from "./Favorite Button";
import FetchResults from "./FetchResults";

export default function Movie({favResults, setFavResults}) {
    const [movieInfo, setMovieInfo] = useState({})
    const { id } = useParams()
    const { genre } = useParams()
    useEffect(() => {
        const fetchMovieData = () => {
                let fetchurl =
                  `https://api.themoviedb.org/3/${genre}/${id}?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&append_to_response=credits,similar,tv_credits`;
                fetch(fetchurl)
                  .then(response => response.json())
                  .then(response => {
                    setMovieInfo(response);
                  });
                  }
                  fetchMovieData()
    }, [id, genre])
    if ( (genre==="person" && movieInfo.tv_credits) || (genre !== "person" && movieInfo.credits && movieInfo.similar)) {
        var monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ];
        var date = new Date(movieInfo.release_date || movieInfo.first_air_date || movieInfo.birthday);
        var dd = date.getDate();
        var mm = date.getMonth();
        var yy = date.getFullYear();
        let releaseDateFull = null
        if (genre !== "person") {
            releaseDateFull = "Release Date: "+monthNames[mm]+" "+dd+", "+yy;
        }
        let fetchRows = null
        if (genre === "person") {
            fetchRows = 
                <>
                <FetchResults results={movieInfo.credits.cast} genre="movie" header="Movie Roles"/> 
                <FetchResults results={movieInfo.tv_credits.cast} genre="tv" header="TV Roles"/> 
                </>
        } else {
            fetchRows =
                <>
                <FetchResults results={movieInfo.credits.cast} genre="person" header="Cast"/>
                <FetchResults results={movieInfo.similar.results} genre={genre} header={`Similar ${genre==="movie"?"Movies":"TV Shows"}`}/>
                </>

        }
        return (
            <div className="moviebody">
                    <div className="movieinfo">
                        <div className={`moviecard${genre==="person"?" personcard":""}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movieInfo.poster_path || movieInfo.profile_path}`} 
                                alt={movieInfo.title || movieInfo.name}
                            />
                            <div className="moviedetails">
                                <h2>
                                    <div>
                                        {movieInfo.title || movieInfo.name}
                                    </div>
                                    <FavoriteButton movie={movieInfo} favResults={favResults} setFavResults={setFavResults} genre={genre} />
                                </h2>
                                <div className="moviedate">
                                    {releaseDateFull}
                                </div>
                                <div className="movieoverview">
                                    {movieInfo.overview || movieInfo.biography}
                                </div>
                            </div>
                        </div>
                    </div>
                    {fetchRows}
            </div>
        )
    }

}
