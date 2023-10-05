import "./App.css";
import Content from "./components/Content/Content.tsx";
import FirstPokemon from "./pages/FirstPokemon/FirstPokemon.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Content />}></Route>
        <Route path="/firstpokemon" element={<FirstPokemon />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
      <ThemeSelector/>
    </div>
  );
}

export default App;
