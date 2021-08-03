import { useState } from "react";

const ButtonText = {
    Edit: "Edit",
    Submit: "Submit"
}
export const PokemonEntry = ({pokemon, onRelease}) => {

    const [editName, setEditName] = useState(false);
    const [editBtnText, setEditBtnText] = useState(ButtonText.Edit);
    const [inputText, setInputText] = useState(pokemon.name);

    const releasePokemon = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await fetch(`http://localhost:4200/pokedex/${pokemon._id}`, requestOptions)
            const data = await res.json();
            alert(`${data.message}`);
        } catch (error) {
            alert("Pokemon won't go away");
        }

        onRelease(pokemon);
    }

    const editButtonClicked = async () => {
        setEditName(prevVal => !prevVal);
        if (editBtnText === ButtonText.Submit) {
            setEditBtnText(ButtonText.Edit);
            const requestOptions = {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: inputText })
            };

            try {
                const res = await fetch(`http://localhost:4200/pokedex/${pokemon._id}`, requestOptions)
                const data = await res.json();
                alert(`Name changed to ${data.name.toUpperCase()}`);
            } catch (error) {
                alert("Pokemon does not like the new name");
            }
        } else {
            setEditBtnText(ButtonText.Submit);
        }
    }

    const updateInput = (event) => {
        setInputText(event.target.value);
    }

    return (
        <div className="entry">
            <button className="btn" 
                onClick={editButtonClicked}>
                    {editBtnText}</button>
            {editName && <input type="text" value={inputText.toUpperCase()}
                onChange={updateInput} />}
            {!editName && <label>{inputText.toUpperCase()}</label>}
            <img src={pokemon.imageUrl} alt="pokemon" />
            <button className="btn" onClick={releasePokemon}>Release</button>
        </div>
    );
}