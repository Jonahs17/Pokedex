import axios from "axios";

async function downloadPokemons(pokemonListState,setPokemonListState,defaultUrl,limit=20) {
    try {
        const response = await axios.get(pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : defaultUrl);
        console.log(response.data);
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous
        }));
        let pokemonResults = response.data.results ? response.data.results: response.data.pokemon;
        pokemonResults=pokemonResults.slice(0,limit) // array of Pokemons
        const pokemonPromise = pokemonResults.map((p) => {
            if(p.url){
                return axios.get(p.url);
            }
            else if(p.pokemon.url){
                return axios.get(p.pokemon.url);
            }
        });
            
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
};

export default downloadPokemons;