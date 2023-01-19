import FetchResults from "./FetchResults";

export default function SearchResults({movieResults, tvResults, parentType}) {
    return (
        <> 
            <FetchResults results={movieResults.results} parentType={parentType} genre="movie" header={parentType==="home" ? "Top Rated Movies" : "Movies"}/>
            <FetchResults results={tvResults.results} parentType={parentType} genre="tv" header={parentType==="home" ? "Top Rated TV Shows" : "TV Shows"}/>
        </>
    )
}
