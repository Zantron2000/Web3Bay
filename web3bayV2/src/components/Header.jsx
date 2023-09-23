import { Web3NetworkSwitch, Web3Button } from "@web3modal/react";
import { useSSX } from "@spruceid/ssx-react";

function Header({ signedIn }) {
  const { ssx } = useSSX();

  return (
    <div className="flex justify-between items-center py-4 px-8 border-white border-b-2 h-[10%]">
      <div className="text-2xl font-bold">ENS Redirect</div>
      <div className="flex items-between">
        {signedIn ? (
          <>
            <div className="px-2">
              <Web3NetworkSwitch />
            </div>
            <div className="px-2">
              <Web3Button label="Disconnect">Sign Out</Web3Button>
            </div>
          </>
        ) : (
          <Web3Button label="Sign In">Sign In</Web3Button>
        )}
      </div>
    </div>
  );
}

export default Header;
