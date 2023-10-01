import "./App.css";
import Content from "./components/Content/Content.tsx";
import FirstPokemon from "./pages/FirstPokemon/FirstPokemon.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Content />}></Route>
        <Route path="/firstpokemon" element={<FirstPokemon />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
      <div className="change_theme">
        <button>Light</button>
        <button>Dark</button>
      </div>
    </div>
  );
}

export default App;
