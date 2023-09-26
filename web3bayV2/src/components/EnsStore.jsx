import { useEffect, useState } from "react";
import { ensExists } from "../utils/web3tools";

import {
  createStoreSubdomain,
  initializeStoreRecords,
} from "../utils/web3tools";

function EnsStore({ ensTarget, ssx }) {
  const [isValidENS, setIsValidENS] = useState(false);

  const isValidSubdomain = async (parentDomain) => {
    const isValid = parentDomain && !(await ensExists(parentDomain));

    setIsValidENS(isValid);
  };

  const createStore = async () => {
    let response = await fetch("/api", {
      method: "GET",
    });
    const data = await response.json();

    response = await createStoreSubdomain(ensTarget, ssx);
    console.log(response);
    if (response) {
      await initializeStoreRecords(
        `store.${ensTarget}`,
        ssx,
        data.data.IpfsHash
      );
    }
  };

  useEffect(() => {
    isValidSubdomain(ensTarget);
  }, [ensTarget]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">{ensTarget}</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <form className="flex flex-col justify-center items-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            type="submit"
            disabled={!isValidENS}
            onClick={(e) => {
              e.preventDefault();
              createStore();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnsStore;
