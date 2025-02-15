import { StyledEngineProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </StyledEngineProvider>
);
