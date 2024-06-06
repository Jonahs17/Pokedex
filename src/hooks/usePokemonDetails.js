import axios from "axios";
import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemon";
import { useParams } from "react-router-dom";

function usePokemonDetails(pokemonName){
    const { id } = useParams();
    let url_value= pokemonName? pokemonName : id;
    const URL="https://pokeapi.co/api/v2/pokemon/" + url_value;
    const [pokemon, setPokemon] = useState(null);
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        pokedexUrl: '',
        nextUrl: '',
        prevUrl: ''
    });

    async function downloadGivenPokemon(id) {
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
            const types= response.data.types.map(t=>t.type.name);
            return types[0];
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    }
    
    async function downloadPokemonAndRelated(id){
        try{
            const type=await downloadGivenPokemon(id);
            await downloadPokemons(pokemonListState,setPokemonListState,`https://pokeapi.co/api/v2/type/${type}`)
        }
        catch(e){
            console.log("no pokemon found");
        }
    }

    useEffect(() => {
        downloadPokemonAndRelated(id);
        window.scrollTo({top:0,left:0,behavior:'smooth'})
    }, [id,pokemonName]); // Include id in the dependency array to re-fetch Pokémon data when id changesid

    return [pokemon,pokemonListState];
}

export default usePokemonDetails;