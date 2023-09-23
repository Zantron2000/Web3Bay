import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function NewItemForm() {
 let navigate = useNavigate();
 const API = process.env.REACT_APP_API_URL;


const [item, setitem] = useState({
   name: "", 
   image: "",
   price: "",
  });

  const handleTextChange = (event) => {
    setitem({ ...item, [event.target.id]: event.target.value });
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    additem(item);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label For="name">Name:</label>
        <input
          id="name"
          value={item.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of item"
          required
        />
        <label For="image">Image:</label>
        <input
          id="image"
          type="text"
          pattern="http[s]*://.+"
          required
          value={item.image}
          placeholder="https://"
          onChange={handleTextChange}
        />
        <label For="price">price:</label>
        <input
          id="price"
          type="text"
          value={item.price}
          placeholder="https://"
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default NewItemForm;