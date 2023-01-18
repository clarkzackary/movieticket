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

        return (
            <>
                {movieInfo.title || movieInfo.name}
                <FetchResults results={movieInfo.credits.cast} genre="person" />
            </>
        )
    }

}
