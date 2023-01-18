import FetchResults from "./FetchResults";

export default function SearchResults({movieResults, tvResults}) {
    return (
        <>
            <FetchResults results={movieResults.results} genre="movie" />
            <FetchResults results={tvResults.results} genre="tv" />
        </>
    )
}
