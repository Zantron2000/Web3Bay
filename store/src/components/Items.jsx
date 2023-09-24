function Items({ items, setItem }) {
  return (
    <div className="bg-grey-300">
      <div className="flex flex-wrap justify-center">
        {items.map((item) => (
          <div className="flex flex-col items-center justify-center w-72 h-96 m-4 bg-white rounded-lg shadow-lg px-2">
            {/** Write a div container for an image of the item that will take up 50% of the height of the card */}
            <div className="w-full h-1/2 bg-black"></div>
            <div className="text-2xl font-bold">{item.title}</div>
            <div className="text-base">
              {item.description.length > 80
                ? item.description.split(80) + "..."
                : item.description}
            </div>
            <div className="text-lg font-bold">{item.price} ETH</div>
            <div className="w-full h-1/6 flex justify-center items-center">
              <button
                className="w-3/4 h-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  console.log("Hi");
                  setItem(item);
                }}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
