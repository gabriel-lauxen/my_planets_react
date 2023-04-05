import { Button, TextField } from "@mui/material";

import "./App.css";
import { Fragment, useState, useEffect } from "react";
import planets from "./planets";
// import useSWR from "swr";
// const fetcher = (url) => fetch(url).then((res) => res.json());
// const { data, isValidating } = useSWR('https://api.le-systeme-solaire.net/rest/bodies/', fetcher)
// console.log(data)
// console.log(isValidating)

function App() {
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(0);
  const [weightOnEarth, setWeightOnEarth] = useState('');
  const planetsButtons = planets.map(planet => {
    return (
      <Button
          key={planet.id}
          variant={selected === planet ? "contained" : "outlined"}
          onClick={() => handleButtonClick(planet)}
          disabled={planet.label === 'Earth' ? true : false}
        >
          {planet.label}
        </Button>
    )
  })

  useEffect(() => {
    calculateResult()
  }, [selected, weightOnEarth])
  
  function handleButtonClick(planet) {
    if (weightOnEarth !== '')setSelected(planet)
    else alert('Digite um peso na terra primeiro')
  }

  function calculateResult() {
    if (weightOnEarth !== '' && selected !== '') {
      const weight = (weightOnEarth / planets[0].gravity * selected.gravity).toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "kg"
      setResult(weight)
    }
  }


  
  return (
    <Fragment>
      <div className="inputs">
        <TextField
          sx={{ mt: 3 }} 
          label="Seu peso na terra"
          type='number'
          value={weightOnEarth}
          className="textfield"
          onChange={(event) => setWeightOnEarth(event.target.value === "" ? '' : Number(event.target.value))}   
        />
        <TextField
          className="textfield"
          color="secondary"
          sx={{ mt: 3 }}
          disabled
          label={selected !== '' ? `Seu peso em: ${selected.label}` : 'selecione um planeta'}
          value={result}
        />
      </div>
      <div className="buttons">
        {planetsButtons}
      </div>
    </Fragment>
  );
}

export default App;
