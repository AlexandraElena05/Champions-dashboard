import React, { useState } from "react";

import Home from "./components/Home.js";
import Single from "./components/Single.js";
import "./App.css";

function App() {
  const [championName, setChampionName] = useState(null);

  function navigateToChampion(championName) {
    setChampionName(championName);
  }

  function navigateToHome() {
    setChampionName(null);
  }

  return (
    <>
      {championName ? (
        <Single championName={championName} onBack={navigateToHome} />
      ) : (
        <Home onSearchedChampion={navigateToChampion} />
      )}
    </>
  );
}

export default App;
