import React from "react";
import Header from "./Header";

import { Web3NetworkSwitch, Web3Button } from "@web3modal/react";
const SignIn = () => {
  return (
    <div className="bg-gray-200 h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center">
        <div className="container mx-auto">
          <div className="bg-white p-8 rounded shadow-md max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6ZM5 20V7H19V20H5ZM16 10V12H18V10H16ZM6 10V12H8V10H6Z"
                  fill="#3B82F6"
                />
              </svg>
            </div>
            <p className="rounded w-full py-2 px-3 mb-4 text-black text-center">
              Spreading web3 and cutting out the middleman
            </p>
            <div className="flex justify-center">
              <Web3Button label="Sign In with Web3">
                Sign In with Web3
              </Web3Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
