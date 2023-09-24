"use client";
import { useState, useEffect } from "react";
import { useSSX } from "@spruceid/ssx-react";
import { getENSNames } from "../utils/web3tools";
import EnsNames from "./EnsNames";
import EnsStore from "./EnsStore";

function SetENS() {
  const { ssx, provider } = useSSX();
  const [ensNames, updateEnsNames] = useState([]);
  const [ensTarget, updateEnsTarget] = useState("");

  const address = ssx.address();

  const getNames = async () => {
    const response = await getENSNames(address);

    updateEnsNames(response);
  };

  useEffect(() => {
    getNames(address);
  }, [address]);

  return (
    <div className="flex flex-row h-full">
      <div className="basis-1/4">
        {ensNames?.length ? (
          <EnsNames ensNames={ensNames} setTarget={updateEnsTarget}></EnsNames>
        ) : (
          <p>No ENS names found</p>
        )}
      </div>
      <div className="basis-3/4 border-white border-l-2 p-2">
        <EnsStore ensTarget={ensTarget} ssx={ssx} />
      </div>
    </div>
  );
}

export default SetENS;
