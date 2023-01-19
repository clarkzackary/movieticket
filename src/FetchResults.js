import { Link, useParams } from "react-router-dom";
import RowCards from "./RowCards";

export default function FetchResults({results, parentType, genre, header}) {
    var movieCards = null;
    console.log(results)
    var allSearch = (<></>)
    const {searchTerm} = useParams()
    if (results) {
        movieCards = results.map(movie => {
            if (movie.poster_path) {
                let movieurl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                return (
                    <RowCards movie={movie} movieurl={movieurl} genre={genre} key={movie.id} />
                )
            } else if (movie.profile_path) {
                let movieurl = `https://image.tmdb.org/t/p/w500${movie.profile_path}`
                return (
                    <RowCards movie={movie} movieurl={movieurl} genre={genre} key={movie.id} />
                )
            } else {
                return null;
            }
        })
        if (parentType==="search") {
            allSearch = (
                <Link to={`/allresults/${genre}/${searchTerm}/1`} className="searchbutton">
                    See All Results
                </Link>
            )
        }
        return (
            <div className="rowtitle">
                <h2>{header}</h2>{allSearch}
                <div className="scrollmenu">
                    <div className="scrollborder">
                    <div className="row movierow">
                        {movieCards}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}