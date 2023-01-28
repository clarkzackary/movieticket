import { Link } from "react-router-dom"
import FavoriteButton from "./Favorite Button"

export default function RowCards({movie, movieurl, genre, favResults, setFavResults}) {


    let card = <></>
    card = 
         <>
            <Link to={`/${genre}/${movie.id}`}>
                <img
                    alt={movie.title || movie.name}
                    src={movieurl}
                    className="movieposter"
                />
            </Link>
            <div className="cardtitle">
                <Link 
                    to={`/${genre}/${movie.id}`}
                    className="titlelink"
                >
                    {movie.title || movie.name}
                </Link>
                <FavoriteButton movie={movie} favResults={favResults} setFavResults={setFavResults} genre={genre}/>
            </div>
         </>

    return (
        <div key={movie.id} className={`card cardlink`}>
            {card}
        </div>
    )
}