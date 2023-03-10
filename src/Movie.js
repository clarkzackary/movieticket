import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchResults from "./FetchResults";
export default function Movie() {
    const [movieInfo, setMovieInfo] = useState({})
    const { id } = useParams()
    const { genre } = useParams()
    useEffect(() => {
        const fetchMovieData = () => {
                let fetchurl =
                  `https://api.themoviedb.org/3/${genre}/${id}?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&append_to_response=credits,similar`;
                fetch(fetchurl)
                  .then(response => response.json())
                  .then(response => {
                    setMovieInfo(response);
                  });
                  }
                  fetchMovieData()
    }, [id, genre])
    if (movieInfo.credits) {
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
        var date = new Date(movieInfo.release_date || movieInfo.first_air_date);
        var dd = date.getDate();
        var mm = date.getMonth();
        var yy = date.getFullYear();
        let releaseDateFull = "Release Date: "+monthNames[mm]+" "+dd+", "+yy;
        return (
            <div className="moviebody">
                    <div className="movieinfo">
                        <div className="moviecard">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movieInfo.poster_path}`} 
                                alt={movieInfo.title || movieInfo.name}
                            />
                            <div className="moviedetails">
                                <h2>{movieInfo.title || movieInfo.name}</h2>
                                <div className="moviedate">
                                    {releaseDateFull}
                                </div>
                                <div className="movieoverview">
                                    {movieInfo.overview}
                                </div>
                            </div>
                        </div>
                    </div>
                <FetchResults results={movieInfo.credits.cast} genre="person" header="Cast"/>
                <FetchResults results={movieInfo.similar.results} genre={genre} header={`Similar ${genre==="movie"?"Movies":"TV Shows"}`}/>
            </div>
        )
    }

}
