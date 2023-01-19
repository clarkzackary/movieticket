import { Link } from "react-router-dom"

export default function RowCards({movie, movieurl, genre}) {
    let titleRef = "title"
    let card = <></>
    if (genre==="tv") {
       titleRef = "name"
       card = 
            <Link to={`/${genre}/${movie.id}`}>
                <img
                    alt={movie.name}
                    src={movieurl}
                    className="movieposter"
                />
                <br/>
                {movie[titleRef]}
            </Link>
    } else if (genre==="movie"){
        titleRef = "title"
        card = 
            <Link to={`/${genre}/${movie.id}`}>
                <img
                    alt={movie.title}
                    src={movieurl}
                    className="movieposter"
                />
                <br/>
                {movie[titleRef]}
            </Link>
    } else if (genre==="person"){
        titleRef = "original_name"
        card =
            <div>
                <img
                    alt={movie.original_name}
                    src={movieurl}
                    className="movieposter"
                />
                <br/>
                {movie[titleRef]}
            </div>
    }
    return (
        <div key={movie.id} className="allrows">
            <div className="card moviecard">
                <div className="cardinner">
                    {card}
                </div>
            </div>
        </div>
    )
}