import { useState, useEffect } from "react";
import { fetchParents } from "./api"; 
import React from "react";

function ParentList() {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const getParents = async () => {
      try {
        const data = await fetchParents(); 
        setParents(data);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };

    getParents();
  }, []);

  return (
    <div>
      <h2>List of Parents</h2>
      {parents.length === 0 ? (
        <p>No parents added yet.</p>
      ) : (
        <ul>
          {parents.map((parent) => (
            <li key={parent.id}>
              {parent.name} - {parent.username} - {parent.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ParentList;
