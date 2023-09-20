import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  :root {
  --sub-color: rgb(255, 255, 255);
}
  
  html {
    scroll-behavior: smooth;
  }
  
  * {
    box-sizing: border-box;
  }
`
export default GlobalStyles;