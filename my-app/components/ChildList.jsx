import { useState, useEffect } from "react";
import { fetchChildren } from "./api"; 
import React from "react";

function ChildList() {
  const [children, setChildren] = useState([]); 
  const [error, setError] = useState(""); 
  useEffect(() => {
    
    const getChildren = async () => {
      try {
        const childrenData = await fetchChildren();
        setChildren(childrenData); 
      } catch (err) {
        console.error("Error fetching children:", err);
        setError("An error occurred while fetching children.");
      }
    };

    getChildren();
  }, []); 

  return (
    <div>
      <h2>List of Children</h2>
      {error && <p className="error">{error}</p>}

      {children.length === 0 ? (
        <p>No children available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child.id}>
                <td>{child.name}</td>
                <td>{child.age}</td>
                <td>{child.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ChildList;
