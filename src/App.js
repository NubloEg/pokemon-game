import "./App.css";
import Menu from "./components/Menu.tsx";
import FirstPokemon from "./pages/FirstPokemon.tsx";
import Pokedex from "./pages/Pokedex/Pokedex.tsx";
import PokemonInfo from "./pages/PokemonInfo/PokemonInfo.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<FirstPokemon />}></Route>
        <Route path="/pokemon/*" element={<PokemonInfo />}></Route>
        <Route path="/pokemons" element={<Pokedex />}></Route>
      </Routes>
      <Menu/>
    </div>
  );
}

export default App;
