import { Link } from "react-router-dom";
import "./pokemon.css"

function Pokemon({name,url,id}){
    return(
    
     <div className="pokemon">
        <Link className='pokemon-link' to={`/pokemon/${id}`}> 
        <div className="pokemon-name">{name}</div>
        <div className="pokemon-image-div">
            <img src={url} alt="" className="pokemon-image"/>
        </div>
        </Link> 
     </div>  
    
    )

};

export { Pokemon };
