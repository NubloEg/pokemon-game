import "./App.css";
import FirstPokemon from "./pages/FirstPokemon.tsx";
import PokemonInfo from "./pages/PokemonInfo.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<FirstPokemon/>}></Route>
        <Route path="/pokemon/*" element={<PokemonInfo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
