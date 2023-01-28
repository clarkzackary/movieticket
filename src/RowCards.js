import { Link } from "react-router-dom"

export default function RowCards({movie, movieurl, genre}) {
    // let titleRef = "title"
    let card = <></>
    // if (genre==="tv" || genre==="movie") {
    //    titleRef = "name"
       card = 
            <Link to={`/${genre}/${movie.id}`}>
                <img
                    alt={movie.title || movie.name}
                    src={movieurl}
                    className="movieposter"
                />
                <div className="cardtitle">
                    {movie.title || movie.name}
                </div>
            </Link>
    // } else if (genre==="person"){
    //     titleRef = "original_name"
    //     card =
    //         <div>
    //             <img
    //                 alt={movie.original_name}
    //                 src={movieurl}
    //                 className="movieposter"
    //             />
    //             <br/>
    //             {movie[titleRef]}
    //         </div>
    // }
    return (
        <div key={movie.id} className={`card cardlink`}>
            {card}
        </div>
    )
}