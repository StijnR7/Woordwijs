import { useState, useEffect } from "react";
import "./Admin.css";

function Admin() {
  const [descriptionCount, setDescriptionCount] = useState(1);
  const [allWords, setAllWords] = useState([]);

  const getWords = async () => {
    const res = await fetch("http://localhost:5000/api/words");
    const data = await res.json();
    setAllWords(data);
  };

  useEffect(() => {
    getWords();
  }, []);

  const handleChangeCount = (e) => {
    setDescriptionCount(Number(e.target.value));
  };

  const addItem = async (e) => {
    e.preventDefault();
    const form = e.target;
    const descriptions = [];

    for (let element of form.elements) {
      if (element.name.includes("description") && element.value.trim() !== "") {
        descriptions.push(element.value.trim());
      }
    }

    const word = form.Word.value.trim();
    if (!word || descriptions.length === 0) return;

    await fetch("http://localhost:5000/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, descriptions }),
    });

    form.reset();
    getWords();
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/api/words/${id}`, {
      method: "DELETE",
    });
    getWords();
  };

  const renderDescriptions = () => {
    const inputs = [];
    for (let i = 0; i < descriptionCount; i++) {
      inputs.push(
        <input key={i} name={`description${i}`} placeholder="Beschrijving" />
      );
    }
    return inputs;
  };

  return (
    <div>
      <input
        type="number"
        defaultValue={1}
        onChange={handleChangeCount}
        placeholder="Aantal beschrijvingen"
      />
      <form onSubmit={addItem}>
        <input placeholder="Woord" type="text" name="Word" />
        {renderDescriptions()}
        <button type="submit">Voeg woord toe</button>
      </form>
      {allWords.map((word) => (
        <div key={word.id}>
          <div>{word.word}</div>
          <ul>
            {JSON.parse(word.descriptions).map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
          <button onClick={() => deleteItem(word.id)}>Verwijder</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
