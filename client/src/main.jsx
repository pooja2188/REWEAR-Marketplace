// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// ⚡ CRUCIAL: MUST BE THE ABSOLUTE FIRST LINE AT THE VERY TOP OF THE FILE
import "./init"; 

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: Network.TESTNET }}
      onError={(error) => console.log("Wallet Provider Error:", error)}
    >
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);
