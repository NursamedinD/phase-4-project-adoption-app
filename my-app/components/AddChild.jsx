import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchChildren } from "./api";
import React from "react";

function AddChild() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);

  useEffect(() => {
    fetchChildren().then((data) => setChildren(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !description) {
      setError("All fields are required.");
      return;
    }

    const newChild = {
      name,
      age,
      description,
    };

    try {
      const response = await fetch("http://127.0.0.1:5555/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChild),
      });

      if (response.ok) {
        const updatedChildren = await fetchChildren();
        setChildren(updatedChildren);
        navigate("/children");
      } else {
        setError("Failed to add child.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred.");
    }
  };

  return (
    <div>
      <h2>Add a New Child</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Child</button>
      </form>

      <h3>All Children</h3>
      <ul>
        {children.map((child) => (
          <li key={child.id}>{child.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AddChild;

