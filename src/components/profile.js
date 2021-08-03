import React, { useState, useEffect } from 'react';
import { PokemonEntry } from "./pokemonEntry";

export const Profile = () => {

    const [capturedPokemons, setCapturedPokemons] = useState([]);
    
    useEffect(() => {
        const fetchCapturedPokemons = async () => {
            const res = await fetch('http://localhost:4200/pokedex');
            const data = await res.json();
            setCapturedPokemons(data);
        };

        fetchCapturedPokemons();
    }, []);

    const updateCapturedPokemon = (releasedPokemon) => {
        setCapturedPokemons(capturedPokemons.filter(capturedPokemon => capturedPokemon._id !== releasedPokemon._id));
    }

    return (
        <div className="list">
            {capturedPokemons.length ? 
                <div className="title">These are your pet Pokemons</div> :
                <div className="title">Time to catch Pokemons</div>}
            {capturedPokemons.length &&
                capturedPokemons.map(pokemon => 
                    <PokemonEntry key={pokemon._id} 
                        pokemon={pokemon}
                        onRelease={updateCapturedPokemon}/>
                )
            }
        </div>
    )
}