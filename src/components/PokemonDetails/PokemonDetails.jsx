import { Link, useParams } from 'react-router-dom';
import './pokemonDetails.css';
import usePokemonDetails from '../../hooks/usePokemonDetails';
import PokemonList from '../PokemonList/PokemonList';
import { Pokemon } from '../Pokemon/Pokemon';

function PokemonDetails({ pokemonName }) {
    const [pokemon,pokemonListState]=usePokemonDetails(pokemonName);

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
            <div className='similar-pokemons'>
            <h2>Similar Pokemons</h2>
            <div className='pokemon-similar-boxes'>
                {pokemonListState.pokemonList.length>0 && 
                    pokemonListState.pokemonList.map((pokemon) => (
                        <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} id={pokemon.id} />
                    ))
                }
            </div>
            </div>
        </div>
    );
}

export default PokemonDetails;
