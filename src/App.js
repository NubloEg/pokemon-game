import "./App.css";
import Content from "./components/Content/Content.tsx";
import FirstPokemon from "./pages/FirstPokemon/FirstPokemon.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector.tsx";
import { Routes, Route } from "react-router-dom";
import { darkTheme, lightTheme, GlobalStyles } from "./theme";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { selectTheme } from './redux/profileSlice'

function App() {
  const theme = useSelector(selectTheme);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route path="/*" element={<Content />}></Route>
          <Route path="/firstpokemon" element={<FirstPokemon />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
        <ThemeSelector theme={theme} />
      </div>
    </ThemeProvider>
  );
}

export default App;
