"use client";
import { useSSX } from "@spruceid/ssx-react";
import ItemForm from "./ItemForm";
import Header from "./Header";
import Items from "./Items";
import Home from "./Home";
import SignInMessage from "./signInMessage";

function App() {
  const { ssx, provider } = useSSX();
  const session = ssx?.session();

  return (
    <div className="App h-full">
      <Header signedIn={session}></Header>
      <div className="Content h-[90%]">
        <div className="flex justify-center">
          <div className="Content-content w-3/4">
            {session ? (
              <div className="flex flex-col justify-center items-center">
                <Home />
              </div>
            ) : (
              <SignInMessage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
