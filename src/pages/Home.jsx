import React, { useState, useEffect } from "react";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import Graph from "./Graph";
import CryptoCurrencyPriceCard from "../components/CryptoCurrencyPriceCard";

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
        <div className="w-[100%] lg:w-[50%] ">
          <Graph />
        </div>
        <div>
          {loader ? (
            <div className="flex justify-center">
              <FallingLines height="50" width="50" />
            </div>
          ) : (
            <div
              className="priceCards flex flex-col items-center mt-6  md:flex-col lg:items-center
                          md:px-10 md:mt-20 md:flex lg:flex-row "
            >
              {priceData?.map((item, index) => (
                <CryptoCurrencyPriceCard data={item} key={item.code} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
