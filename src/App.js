import './App.css';
import { SlideShow } from "./components/slideShow";
import { useState, useEffect } from "react";

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40');
      const data = await res.json();
      const pokemonList = data.results;
      const deserializedList = [];
      for (let i=0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        const additonalRes = await fetch(pokemon.url);
        const additionalData = await additonalRes.json();
        const imageUrl = additionalData.sprites.front_default;
        deserializedList.push({
          name: pokemon.name,
          url: imageUrl
        });
      };
      setPokemons(deserializedList);
      setSelectedIndex(0);
    }

    fetchPokemons();
  }, []);

  useEffect(() => {
    setCurrentPokemon(pokemons[selectedIndex]);
  }, [selectedIndex, pokemons]);

  const getNextPokemon = () => {
    if (selectedIndex === pokemons.length) {
      alert("That's it folks!!");
      return;
    }
    setSelectedIndex(prevValue => prevValue + 1);
  }

  const getPrevPokemon = () => {
    if (selectedIndex === 0) {
      alert("That's it folks!!");
      return;
    }
    setSelectedIndex(prevValue => prevValue - 1);
  }

  return (
    <div className="container">
      <div className="header">Catch `em All</div>
      {currentPokemon && <SlideShow pokemon={currentPokemon}
        nextClicked={getNextPokemon} prevClicked={getPrevPokemon}/>}
    </div>
  );
}

export default App;
