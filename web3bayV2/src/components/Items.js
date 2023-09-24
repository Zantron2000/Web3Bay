function Items({ items, addItem, deleteItem, setEditItem, doneCreating }) {
  console.log(items.map((item) => item.description.length));
  return (
    <div className="bg-grey-300">
      <div className="flex flex-wrap justify-center">
        {items.map((item) => (
          <div className="flex flex-col items-center justify-center w-72 h-96 m-4 bg-white rounded-lg shadow-lg px-2 text-black">
            <div
              className={`w-full h-1/2 bg-black bg-[${
                item.image ? URL.createObjectURL(item.image) : "#"
              }]`}
              style={{
                backgroundImage: item.image
                  ? `url(${URL.createObjectURL(item.image)})`
                  : "#",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="text-2xl font-bold">{item.title}</div>
            <div className="text-base">
              {item.description.length > 15
                ? item.description.substring(0, 30) + "..."
                : item.description}
            </div>
            <div className="text-lg font-bold">{item.price} ETH</div>
            <div className="w-full h-1/6">
              <button
                className="w-[100%] h-1/2 bg-yellow hover:bg-yellow-700 text-white font-bold rounded-full my-2"
                onClick={() => {
                  setEditItem(item);
                }}
              >
                Edit
              </button>
              <button
                className="w-[100%] h-1/2 bg-red hover:bg-red-700 text-white font-bold rounded-full"
                onClick={() => deleteItem(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-1/2 h-1/4 bg-teal-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={addItem}
      >
        Add More Items
      </button>
      <button
        className="w-1/2 h-1/4 bg-teal-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={doneCreating}
      >
        Upload
      </button>
    </div>
  );
}

export default Items;
