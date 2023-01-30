import FetchResults from "./FetchResults";

export default function HomeResultsWrapper({movieResults, tvResults, favResults, setFavResults}) {
    let favRow = <></>
    if (favResults.items && favResults.items.length > 0) {
        favRow =
            <FetchResults results={favResults.items} parentType="home" genre="movie" header="Community Favorites" favResults={favResults} setFavResults={setFavResults}/>
    }
    return (
        <>  
            <FetchResults results={movieResults.results} parentType="home" genre="movie" header="Top Rated Movies" favResults={favResults} setFavResults={setFavResults}/>
            <FetchResults results={tvResults.results} parentType="home" genre="tv" header="Top Rated TV Shows" favResults={favResults} setFavResults={setFavResults}/>
            {favRow}
        </>
    )
}
