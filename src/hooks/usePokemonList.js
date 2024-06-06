import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){

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

    return [pokemonListState,setPokemonListState];
};

export default usePokemonList;