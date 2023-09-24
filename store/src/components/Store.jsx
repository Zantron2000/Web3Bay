import Header from "./Header";
import Items from "./Items";
import { useState } from "react";

import BuySection from "./BuySection";

import { useSSX } from "@spruceid/ssx-react";

const items = [
  {
    title: "Item 1",
    description: "This is item 1",
    price: 1,
  },
  {
    title: "Item 2",
    description: "This is item 2",
    price: 2,
  },
  {
    title: "Item 3",
    description:
      "This is item 3 dddd dddddddddd ddddd ddddfadf asdf adfasd fasd fasd fasd fasd fadf",
    price: 3,
  },
  {
    title: "Item 4",
    description: "This is item 4",
    price: 4,
  },
  {
    title: "Item 5",
    description: "This is item 5",
    price: 5,
  },
  {
    title: "Item 6",
    description: "This is item 6",
    price: 6,
  },
];

function Store() {
  const { ssx, provider } = useSSX();
  const session = ssx?.session();

  return (
    <div>
      <Header signedIn={session} />
      <Items items={items} />
    </div>
  );
}

export default Store;
