import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

console.log(import.meta.env.MODE);
console.log(import.meta.env.VITE_API_PROTOCOL);
console.log(import.meta.env.VITE_API_DOMAIN);
console.log(import.meta.env.VITE_API_PORT);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
