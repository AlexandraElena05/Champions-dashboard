import React, { useState, useEffect } from "react";

function Home(props) {
  const [champions, setChampions] = useState([]);
  const [sorted, setSorted] = useState("asc");
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.pandascore.co/lol/champions?page[number]=2&page[size]=10&token=Fcxx54gqiHZjcSfBpOCRe5fnOjH5Nd0KvggXFcITOPzdYuTyNmE"
    )
      .then((response) => response.json())
      .then((data) => {
        setChampions(data);
      });
  }, []);

  const handleSorted = (e) => {
    e.target.value === "asc" ? setSorted("asc") : setSorted("desc");
  };

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = champions.filter((champion) => {
        const regex = new RegExp(`${text}`, "gi");
        return champion.name.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
  };

  return (
    <>
      <p>
        Sort in{" "}
        <select defaultValue={sorted} onChange={(e) => handleSorted(e)}>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>{" "}
        order
      </p>
      <label>Search for a champion</label>
      <br></br>
      <input
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
      />
      {suggestions &&
        suggestions.map((suggestion, id) => (
          <button
            key={id}
            onClick={() => props.onSearchedChampion(suggestion.name)}
          >
            {suggestion.name}
          </button>
        ))}
      {sorted === "asc" &&
        champions
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((champion) => (
            <div key={champion.id}>
              <h1> {champion.name}</h1>
              <img src={champion.image_url} />
            </div>
          ))}
      {sorted === "desc" &&
        champions
          .sort((a, b) => (a.name < b.name ? 1 : -1))
          .map((champion) => (
            <div key={champion.id}>
              <h1> {champion.name}</h1>
              <img src={champion.image_url} />
            </div>
          ))}
    </>
  );
}

export default Home;
