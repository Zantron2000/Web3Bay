"use client";
import { useSSX } from "@spruceid/ssx-react";
import ItemForm from "./ItemForm";
import Header from "./Header";
import Items from "./Items";
import Home from "./Home";

function App() {
  const { ssx, provider } = useSSX();
  const session = ssx?.session();

  return (
    <div className="App h-full">
      <Header signedIn={session}></Header>
      <div className="Content h-[90%]">
        <div className="Content-container h-full"> <Home signedIn={session} /></div>
      </div>
      
    </div>
  );
}

export default App;
