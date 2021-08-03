import React from 'react';
import PropTypes from "prop-types";

export const SlideShow = ({pokemon, nextClicked, prevClicked}) => {

    return (
        <>
            <div class='title'>{pokemon.name}</div>
            <div class='carousel'>
                <button className="btn" onClick={prevClicked}>{'<'}</button>
                <img className="" src={pokemon.url} alt="Pokemon"/>
                <button className="btn" onClick={nextClicked}>{'>'}</button>
            </div>
            <button className="btn btn-block" onClick={() => alert("Got it")}>Capture</button>
        </>
    )
}

SlideShow.prototype = {
    name: PropTypes.string,
    url: PropTypes.string
}