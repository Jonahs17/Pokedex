import { Link, useParams } from 'react-router-dom';
import './pokemonDetails.css';
import usePokemonDetails from '../../hooks/usePokemonDetails';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon]=usePokemonDetails(id);

    return (
        <div>
            <Link to='/'>Pokedex</Link>

            {pokemon && (
                <div className='pokemon-details-wrapper'>
                    <div className='pokemon-name'>{pokemon.name}</div>
                    <div className='pokemon-detail-image'>
                        <img src={pokemon.image} alt={pokemon.name} />
                    </div>
                    <div className='pokemon-height'>
                        Height: {pokemon.height} 
                    </div>
                    <div className='pokemon-weight'>
                        Weight: {pokemon.weight}
                    </div>
                    <div className='pokemon-types'>
                        Type:{' '}
                        {pokemon.types.map((type) => (
                            <span key={type.type.name}>{type.type.name}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PokemonDetails;
