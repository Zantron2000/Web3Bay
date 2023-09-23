"use client";
import { useSSX } from "@spruceid/ssx-react";

import Header from "./Header";

function App() {
  const { ssx, provider } = useSSX();
  const session = ssx?.session();

  return (
    <div className="App h-full">
      <Header signedIn={session}></Header>
      <div className="Content h-[90%]">
        <div className="Content-container h-full">Hello</div>
      </div>
    </div>
  );
}

export default App;
