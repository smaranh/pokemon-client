import React from 'react';
import PropTypes from "prop-types";

export const SlideShow = ({pokemon, nextClicked, prevClicked, onCaptured}) => {

    const capturePokemon = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: pokemon.name, imageUrl: pokemon.url })
        };
        try {
            const res = await fetch('http://localhost:4200/pokedex', requestOptions)
            const data = await res.json();
            alert(`${data.name.toUpperCase()} was captured`);
        } catch (error) {
            alert("Pokemon ran away");
        }
        onCaptured();
    }
    
    return (
        <>
            <div className='title'>{pokemon.name.toUpperCase()}</div>
            <div className='carousel'>
                <button className="btn" onClick={prevClicked}>{'<'}</button>
                <img className="" src={pokemon.url} alt="Pokemon"/>
                <button className="btn" onClick={nextClicked}>{'>'}</button>
            </div>
            <button className="btn btn-block" onClick={capturePokemon}>Capture</button>
        </>
    )
}

SlideShow.prototype = {
    name: PropTypes.string,
    url: PropTypes.string
}