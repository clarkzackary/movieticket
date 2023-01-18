import FetchResults from "./FetchResults";

export default function SearchResults({searchHeader, movieResults, tvResults}) {
    return (
        <>  
            {searchHeader}
            <FetchResults results={movieResults.results} genre="movie" header="Movies"/>
            <FetchResults results={tvResults.results} genre="tv" header="TV Shows"/>
        </>
    )
}
