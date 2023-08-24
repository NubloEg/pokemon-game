import "./App.css";
import Content from "./components/Content/Content.tsx";
import Pokedex from "./pages/Pokedex/Pokedex.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Content />}></Route>
        <Route path="/auth" element={<Pokedex />}></Route>
      </Routes>
    </div>
  );
}

export default App;
