import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
const CryptoWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (err) {
        setError(err.message);
      }
    } else {
      /* MetaMask is not installed */
      setError("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          window.ethereum
            .request({ method: "eth_getBalance", params: [accounts[0], "latest"] })
            .then((balance) => {
              setUserBalance(ethers.formatEther(balance));
            });
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        setError(err.message);
      }
    } else {
      /* MetaMask is not installed */
      setError("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      setError("Please install MetaMask");
    }
  };

  return (
    <div className="text-white mt-20 flex justify-center h-[20rem] ">
      <div className="bg-[#1A1E1C] p-6 rounded-md ">
        <div
          className="text-center text-xl font-semibold 
          bg-gradient-to-b from-teal-400 to-yellow-200  bg-clip-text text-transparent
        w-[15rem]"
        >
          {userBalance ? "Wallet Balance" : "Connect your Wallet"}
        </div>

        {error ? (
          <div className="mt-5 flex justify-center ">
            {" "}
            <div
              className="text-center text-white w-[15rem]
             whitespace-nowrap overflow-x-hidden text-ellipsis"
            >
              {error}
            </div>
          </div>
        ) : (
          <div className=" flex justify-center items-center h-full text-2xl font-semibold">
            {userBalance ? (
              <div>{userBalance} ETH </div>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-400 text-white text-sm
          font-bold py-2 px-2 border-b-4 border-green-700 hover:border-green-500 rounded"
                onClick={() => connectWallet()}
              >
                Connect wallet
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoWallet;
