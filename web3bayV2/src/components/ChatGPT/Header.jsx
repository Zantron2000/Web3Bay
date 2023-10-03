import React from "react";
import { Web3NetworkSwitch, Web3Button } from "@web3modal/react";

const Header = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Web3Shopify</h1>
        <Web3Button
          className="bg-blue-500 px-4 py-2 rounded"
          label="Sign In"
        ></Web3Button>
      </div>
    </div>
  );
};

export default Header;
