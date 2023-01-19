import RowCards from "./RowCards";

export default function FetchResults({results, genre, header}) {
    var movieCards = null;
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
        return (
            <div className="rowtitle">
                <h2>{header}</h2>
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