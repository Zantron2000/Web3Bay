import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WagmiConfig, useWalletClient } from "wagmi";
import { Web3Modal as Web3ModalV2 } from "@web3modal/react";
import { SSXProvider } from "@spruceid/ssx-react";

import settings from "./utils/web3modalV2Settings";
import "./index.css";
import { disconnect } from "@wagmi/core";

async function attemptSignIn(ssx) {
  try {
    await ssx.signIn();
  } catch (e) {
    console.error(e);
    disconnect();
  }
}

const { ethereumClient, wagmiConfig, projectId } = settings;

function SSXWithWatchProvider({ children }) {
  const { data: walletClient } = useWalletClient();

  const web3Provider = {
    provider: walletClient,
  };

  return (
    <SSXProvider
      ssxConfig={{
        siweConfig: {
          domain: "localhost:3000",
        },
      }}
      web3Provider={web3Provider}
      /**
       * You can use the watchProvider property to control the
       * sign in/out and change account flows.
       */
      watchProvider={async (provider, ssx) => {
        if (ssx) {
          // SignIn
          if (provider && !ssx.address()) {
            await attemptSignIn(ssx);

            return ssx;
            // Change Account
          } else if (
            provider &&
            ssx.address() &&
            provider.account.address !== ssx.address()
          ) {
            await ssx.signOut();
            await attemptSignIn(ssx);
            return ssx;

            // SignOut
          } else {
            await ssx.signOut();
          }
        }
      }}
    >
      {children}
    </SSXProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <SSXWithWatchProvider>
        <App />
      </SSXWithWatchProvider>
    </WagmiConfig>
    <Web3ModalV2 projectId={projectId} ethereumClient={ethereumClient} />
  </React.StrictMode>
);
