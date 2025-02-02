import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addParent } from "./api"; 
import React from "react";

function AddParent() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const newParent = {
      name,
      username,
      email,
      password,
    };

    try {
      const response = await addParent(newParent); 
      if (response.ok) {
        navigate("/parents"); 
      } else {
        setError("Failed to add parent.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred.");
    }
  };

  return (
    <div>
      <h2>Add a New Parent</h2>
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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Parent</button>
      </form>
    </div>
  );
}

export default AddParent;
