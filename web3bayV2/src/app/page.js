"use client";
import { WagmiConfig } from "wagmi";
import React from "react";
import { Web3Modal } from "@web3modal/react";
import App from "../components/App";

import {
  wagmiConfig,
  projectId,
  ethereumClient,
  defaultChain,
} from "../utils/web3modalV2Settings";
import { SSXWithWatchProvider } from "../components/SSXWithWatchProvider";

export default function Home() {
  return (
    <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
        <SSXWithWatchProvider>
          <App />
        </SSXWithWatchProvider>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={defaultChain}
      />
    </React.StrictMode>
  );
}
