import { Link, useParams } from 'react-router-dom';
import './pokemonDetails.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonDetails() {
    const { id } = useParams();
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const [pokemon, setPokemon] = useState(null);

    async function downloadPokemon() {
        try {
            const response = await axios.get(URL);
            const pokemonData = response.data;
            setPokemon({
                name: pokemonData.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: pokemonData.types,
                image: pokemonData.sprites.other.dream_world.front_default
            });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [id]); // Include id in the dependency array to re-fetch Pokémon data when id changes

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
