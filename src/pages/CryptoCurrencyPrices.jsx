import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoCurrencyPriceCard from "../components/CryptoCurrencyPriceCard";
import { FallingLines } from "react-loader-spinner";

const CryptoCurrencyPrices = () => {
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
    <div className="mt-16 h-screen">
      <div className="flex items-center justify-center pt-5 ">
        <div className="text-[#f7931a] text-2xl font-semibold  ">₿</div>
        <div
          className="text-2xl ml-2 font-semibold
         bg-gradient-to-b from-teal-400 to-yellow-200  bg-clip-text text-transparent "
        >
          BitCoin Prices
        </div>
      </div>
      {error ? <p className="text-red-400">Error! - {error}</p> : ""}

      {loader ? (
        <div className="flex justify-center">
          <FallingLines height="50" width="50" />
        </div>
      ) : (
        <div
          className="priceCards flex flex-col items-center mt-6 md:flex-col lg:items-center
       md:px-20 md:mt-20 md:flex lg:flex-row md:justify-evenly"
        >
          {priceData?.map((item, index) => (
            <CryptoCurrencyPriceCard data={item} key={item.code} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoCurrencyPrices;
