import {createGlobalStyle} from "styled-components"

export const darkTheme = {
    body: "rgb(24, 24, 24)",
    textColor: "#fff",
    headingColor: "lightblue"
  }
  
  export const lightTheme = {
    body: "rgb(249, 255, 181)",
    textColor: "#000",
    headingColor: "#d23669"
  }
  
  export const GlobalStyles = createGlobalStyle`
   body {
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease;
   }
   h2{
     color: ${props => props.theme.textColor};
   }
  `