import FetchResults from "./FetchResults";

export default function SearchResults({movieResults, tvResults, parentType}) {
    return (
        <> 
            <FetchResults results={movieResults.results} genre="movie" header={parentType==="home" ? "Top Rated Movies" : "Movies"}/>
            <FetchResults results={tvResults.results} genre="tv" header={parentType==="home" ? "Top Rated TV Shows" : "TV Shows"}/>
        </>
    )
}
