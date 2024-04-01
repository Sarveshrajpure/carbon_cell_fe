import React from "react";

const CryptoCurrencyPriceCard = ({ data }) => {
  return (
    <div className="bg-[#1A1E1C] p-4 rounded-md mb-4 mr-5 w-[15rem]">
      <div>
        <div className="cardTitle flex">
          <div
            className=" text-center text-lg  text-[#1A1E1C] font-semibold w-8 h-8 leading-8 rounded-full
           bg-gradient-to-b from-teal-400 to-yellow-200"
            dangerouslySetInnerHTML={{ __html: data.symbol }}
          />
          <div
            className="font-semibold text-white text-sm
           leading-8 ml-2 w-[10rem] whitespace-nowrap overflow-x-hidden text-ellipsis"
          >
            {data.description}
          </div>
        </div>
        <div className="mt-6 text-white text-sm font-light">Rate</div>
        <div className="mt-2 text-white font-semibold">
          {data.rate}
          <span dangerouslySetInnerHTML={{ __html: data.symbol }} />
        </div>
      </div>
    </div>
  );
};

export default CryptoCurrencyPriceCard;
