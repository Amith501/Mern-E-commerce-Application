import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import ContextState from "./context/ContextState.jsx";
import { Provider } from "react-redux";
import Store from "./Redux/store"

createRoot(document.getElementById("root")).render(
  // <ContextState>
  <Provider store={Store}>
    <App />
  </Provider>
  // </ContextState>
);
