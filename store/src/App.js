import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

import Store from "./components/Store";
import { default as SSXWithWatchProvider } from "./components/SSXWithWatchProvider";

// 1. Get projectId
const projectId = "773ec2d1dd0346a1413f5ebc1649501d";

// 2. Create wagmiConfig
const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "Web3Modal",
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SSXWithWatchProvider>
        <Store />
      </SSXWithWatchProvider>
    </WagmiConfig>
  );
}

export default App;
