import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import NavBarLayout from "./NavBarLayout";
import Graph from "./pages/Graph";
import CryptoCurrencyPrices from "./pages/CryptoCurrencyPrices";

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route element={<NavBarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/crypto" element={<CryptoCurrencyPrices />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
