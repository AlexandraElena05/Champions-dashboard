import React, { useState, useEffect } from "react";

function Single(props) {
  const [championInfo, setChampionInfo] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.pandascore.co/lol/champions?search[name]=${props.championName}&token=Fcxx54gqiHZjcSfBpOCRe5fnOjH5Nd0KvggXFcITOPzdYuTyNmE`
    )
      .then((response) => response.json())
      .then((data) => {
        setChampionInfo(data);
      });
  }, []);

  return (
    <>
      <button onClick={() => props.onBack()}>Home</button>

      {championInfo.map((info) => (
        <>
          <h1>{info.name}</h1>
          <p>Attack damage per level: {info.attackdamageperlevel}</p>
          <p>Move speed: {info.movespeed}</p>
          <img src={info.image_url} />
        </>
      ))}
    </>
  );
}

export default Single;
