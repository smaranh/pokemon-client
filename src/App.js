import { useState, useEffect } from "react";
import './App.css';
import { SlideShow } from "./components/slideShow";
import { Profile } from "./components/profile";

const Tabs = {
  Profile: 'profile',
  Hunt: 'hunt'
}
function App() {

  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedTab, setSelectedTab] = useState(Tabs.Profile);

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

  const pokemonCaptured = () => {
    if (selectedIndex === pokemons.length) {
      setSelectedIndex(prevValue => prevValue - 1);
    } else {
      setSelectedIndex(prevValue => prevValue + 1);
    }
  }

  const isTabSelected = (value) => {
    return selectedTab === value;
  }

  return (
    <div className="container">
      <div className="tabOptions">
        <div className={ isTabSelected(Tabs.Profile) ? 'selected' : '' } 
          onClick={() => setSelectedTab(Tabs.Profile)}>Trainer Profile</div>
        <div className={ isTabSelected(Tabs.Hunt) ? 'selected' : '' }
          onClick={() => setSelectedTab(Tabs.Hunt)}>Hunt Pokemons</div>
      </div>
      {selectedTab === Tabs.Profile && 
        <Profile />}
      {selectedTab === Tabs.Hunt && <div>
        {currentPokemon && <SlideShow pokemon={currentPokemon}
          nextClicked={getNextPokemon} prevClicked={getPrevPokemon}
          onCaptured={pokemonCaptured}/>}
      </div>}
    </div>
  );
}

export default App;
