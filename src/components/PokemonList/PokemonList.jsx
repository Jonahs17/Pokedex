import { useEffect, useState } from 'react';
import './pokemonList.css';
import axios from 'axios';
import { Pokemon } from '../Pokemon/Pokemon';

function  PokemonList(){
    const DEFAULT_URL="https://pokeapi.co/api/v2/pokemon";
    const [pokedexUrl,setPokedexUrl]=useState("https://pokeapi.co/api/v2/pokemon");
    const[nextUrl,setNextUrl]=useState(DEFAULT_URL);
    const[prevUrl,setPrevUrl]=useState(DEFAULT_URL);

    const[pokemonList,setPokemonList]=useState([]);

    async function download_pokemons(){
        const response=await axios.get(pokedexUrl?pokedexUrl:DEFAULT_URL);
        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous)
        const pokemonResults=response.data.results; //array of Pokemons
        const pokemonPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        const pokemonListData=await axios.all(pokemonPromise);
        console.log(pokemonListData);
        const pokemonFinalList=pokemonListData.map((pokemonData)=>{
            const pokemon=pokemonData.data;
            return({
                id:pokemon.id,
                name:pokemon.name,
                image:pokemon.sprites.other.dream_world.front_default,
                types:pokemon.types
            })
        });
        setPokemonList(pokemonFinalList);
        console.log(pokemonFinalList);
    }


    useEffect(()=>{
        download_pokemons()
    },[pokedexUrl]);

    return(
        <div className='pokemon-list-wrapper'>
        <div><h1>Pokemon List</h1></div>
        <div className='page-controls'>
            <button onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
            <button onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
        </div>
        <div className='pokemon-list'>
        {pokemonList.map((pokemon)=><Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image}/>)}
        </div>
        

        </div>
        
    )

};

export default PokemonList;