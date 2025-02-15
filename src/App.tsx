import "./App.css";
import "/fonts/PencilSharp.ttf";

import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./components/Header";
import Game from "./routes/Game";
import Home from "./routes/Home";
import Leaderboard from "./routes/Leaderboard";
import NotFound from "./routes/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { RoutePath } from "./utils/enums";
import { THEME } from "./utils/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={THEME}>
        <Routes>
          <Route index element={<Home />} />
          <Route element={<Header />}>
            <Route element={<ProtectedRoute />}>
              <Route path={RoutePath.GAME} element={<Game />} />
              <Route path={RoutePath.LEADERBOARD} element={<Leaderboard />} />
            </Route>
            <Route path={RoutePath.NOT_FOUND} element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
