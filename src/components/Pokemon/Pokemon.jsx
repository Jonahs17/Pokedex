import "./pokemon.css"

function Pokemon({name,url}){
    return(
     <div className="pokemon">
        <div className="pokemon-name">{name}</div>
        <div className="pokemon-image-div">
            <img src={url} alt="" className="pokemon-image"/>
        </div>
     </div>   
    )

};

export { Pokemon };
