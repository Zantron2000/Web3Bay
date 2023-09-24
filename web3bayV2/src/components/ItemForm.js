import { useState } from "react";
import SignInMessage from "./signInMessage";
import Items from "./Items";


const ItemForm = ({ signedIn }) => {
  
  const [item, setItem] = useState({
    name: "",
    price: "",
    description: "",
    // image: true,
  });

console.log(item)
const [toggle, setToggle] = useState(false)

const [file, setFile] = useState();

const handleTextChange = (event) => {
    setItem({ ...item, [event.target.id]: event.target.value });
  };

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(item)
    if(item) setItem(item);
    setToggle(!toggle)
  };

const handleImageChange = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
} 

  return (
    <div class="grid place-items-center h-screen">
      {signedIn ? (
        <>
          <form class=" max-w-lg" onSubmit={handleSubmit}>
            <div class="md:flex md:items-center mb-6">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="name"
              >
                Item Name
              </label>
              <div>
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  value={item.name}
                  type="text"
                  onChange={handleTextChange}
                  required
                />
                <p class="text-blue-500 text-xs italic">
                  Please fill out this field.
                </p>
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="price"
              >
                Price
              </label>
              <div>
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="price"
                  value={item.price}
                  type="text"
                  onChange={handleTextChange}
                />
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="price"
              >
                Description
              </label>
              <div>
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="description"
                  value={item.description}
                  type="text"
                  onChange={handleTextChange}
                />
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="image"
                ></label>

                <div>
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="image_help"
                    id="image"
                    type="file"
                    value={item.image}
                    onChange={handleImageChange}
                  />
                  <img src={file} />
                  <div
                    class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="user_avatar_help"
                  >
                    Upload an image of your item
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="md:flex md:items-center mb-6">
                <button
                  class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Submit 
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <SignInMessage />
      )}
      {toggle ? <Items item={item} /> : null}
    </div>
  );
};

export default ItemForm;
