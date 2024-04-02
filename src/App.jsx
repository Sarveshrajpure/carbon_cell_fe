import React, { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Graph from "./pages/Graph";
import CryptoCurrencyPrices from "./pages/CryptoCurrencyPrices";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="app">
      <HashRouter>
        <div className=" lg:flex w-full">
          <div
            className={`${
              isOpen ? "fixed h-[100%] w-[100%] lg:h-full lg:w-[30%] lg:static " : "w-[10%]"
            } `}
          >
            <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div className={`${isOpen ? "lg:w-[100%]" : "w-[100%] lg:w-[90%]"} `}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/graph" element={<Graph />} />
              <Route path="/crypto" element={<CryptoCurrencyPrices />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
