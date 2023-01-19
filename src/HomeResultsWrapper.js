import SearchResults from "./SearchResults";

export default function HomeResultsWrapper({movieResults, tvResults}) {
    return (
        <>  
            <SearchResults movieResults={movieResults} tvResults={tvResults} parentType="home"/>
        </>
    )
}
