export default function FavoriteButton({movie, favResults, setFavResults, genre}) {
	const addFavorite = (id) => {
        fetch(
            "https://api.themoviedb.org/3/list/32914/add_item?api_key=4f2d813db1c216bca9c8a22d63ad274a&session_id=8203c9d46e318fdae07959d4701916b6a13b5031",
            {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ media_id: id })
          }
        ).then(() => {
            fetch(`https://api.themoviedb.org/3/list/32914?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false`)
            .then(response => response.json())
            .then((json) => {
                setFavResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })}
        )
    }
    const removeFavorite = (id) => {
        fetch(
          "https://api.themoviedb.org/3/list/32914/remove_item?api_key=4f2d813db1c216bca9c8a22d63ad274a&session_id=8203c9d46e318fdae07959d4701916b6a13b5031",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ "media_id": id })
          }
        ).then(() => {
            fetch(`https://api.themoviedb.org/3/list/32914?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false`)
            .then(response => response.json())
            .then((json) => {
                setFavResults(json)
            })
            .catch(function(error) {
                console.log(error);
            })}
        )
    }

    let favButton = <></>

    if (genre === "movie") {
        favButton =
            <button
                className = "favbutton unfav"
                onClick={() => addFavorite(movie.id)}
            >
                &#9825;
            </button>
        if (favResults && favResults.items) {
            for (let i=0; i < favResults.items.length; i++) {
                if (favResults.items[i].id === movie.id) {
                    favButton = 
                        <button
                            className = "favbutton fav"
                            onClick={() => removeFavorite(movie.id)}
                        >
                            &#9829;
                        </button>
                    break
                }
            }
        }
    }
    return (
        <>  
           {favButton}
        </>
    )
}
