import React, { useState, useEffect } from "react";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import Graph from "./Graph";
import CryptoCurrencyPriceCard from "../components/CryptoCurrencyPriceCard";
import CryptoWallet from "../components/CryptoWallet";

const Home = () => {
  const [priceData, setPriceData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCryptoPrice = async () => {
      try {
        setError("");
        setLoader(true);

        let response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");

        let dataObject = response.data.bpi;
        let dataArray = [];

        Object.keys(dataObject).forEach((key) => {
          dataArray.push(dataObject[key]);
        });
        setPriceData(dataArray);
        setLoader(false);
      } catch (err) {
        setError(err.message);
        setLoader(false);
      }
    };

    getCryptoPrice();
  }, []);
  return (
    <div className="h-content">
      <div>
        <div className=" lg:flex  ">
          <div className="lg:w-[60%]  ">
            <Graph />
          </div>
          <div className="">
            <CryptoWallet />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center mt-14 ">
            <div className="text-[#f7931a] text-2xl font-semibold  ">₿</div>
            <div
              className="text-2xl ml-2 font-semibold
         bg-gradient-to-b from-teal-400 to-yellow-200  bg-clip-text text-transparent "
            >
              BitCoin Prices
            </div>
          </div>

          {loader ? (
            <div className="flex justify-center">
              <FallingLines height="50" width="50" />
            </div>
          ) : (
            <>
              <div
                className="priceCards flex flex-col items-center md:flex-col lg:items-center
                        md:px-10 md:mt-8 md:flex lg:flex-row "
              >
                {" "}
                {priceData?.map((item, index) => (
                  <CryptoCurrencyPriceCard data={item} key={item.code} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
