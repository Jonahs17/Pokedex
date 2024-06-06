import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id){
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const [pokemon, setPokemon] = useState(null);

    async function downloadPokemon(id) {
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
        downloadPokemon(id);
    }, [id]); // Include id in the dependency array to re-fetch Pokémon data when id changesid

    return [pokemon];
}

export default usePokemonDetails;