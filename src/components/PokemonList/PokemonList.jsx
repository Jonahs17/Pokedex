import { useEffect, useState } from 'react';
import './pokemonList.css';
import axios from 'axios';
import { Pokemon } from '../Pokemon/Pokemon';

function PokemonList() {
    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        pokedexUrl: DEFAULT_URL,
        nextUrl: DEFAULT_URL,
        prevUrl: DEFAULT_URL
    });

    async function downloadPokemons() {
        try {
            const response = await axios.get(pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : DEFAULT_URL);
            console.log(response.data);
            setPokemonListState((state) => ({
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous
            }));
            const pokemonResults = response.data.results; // array of Pokemons
            const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
            const pokemonListData = await axios.all(pokemonPromise);
            console.log(pokemonListData);
            const pokemonFinalList = pokemonListData.map((pokemonData) => ({
                id: pokemonData.data.id,
                name: pokemonData.data.name,
                image: pokemonData.data.sprites.other.dream_world.front_default,
                types: pokemonData.data.types
            }));
            setPokemonListState((state) => ({
                ...state,
                pokemonList: pokemonFinalList
            }));
            console.log(pokemonFinalList);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return (
        <div className='pokemon-list-wrapper'>
            <div>
                <h1>Pokemon List</h1>
            </div>
            <div className='page-controls'>
                <button onClick={() => setPokemonListState((state) => ({ ...state, pokedexUrl: pokemonListState.prevUrl }))}>Prev</button>
                <button onClick={() => setPokemonListState((state) => ({ ...state, pokedexUrl: pokemonListState.nextUrl }))}>Next</button>
            </div>
            <div className='pokemon-list'>
                {pokemonListState.pokemonList.map((pokemon) => (
                    <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} id={pokemon.id} />
                ))}
            </div>
        </div>
    );
}

export default PokemonList;
