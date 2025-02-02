import React, { useState, useEffect } from "react";
import { fetchAdoptedChildren } from "../api";

function AdoptionList() {
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const loadAdoptions = async () => {
      const fetchedAdoptions = await fetchAdoptedChildren();
      setAdoptions(fetchedAdoptions);
    };

    loadAdoptions();
  }, []);

  return (
    <div>
      <h2>Adoption List</h2>
      <table>
        <thead>
          <tr>
            <th>Adoption ID</th>
            <th>Child Name</th>
            <th>Parent Name</th>
          </tr>
        </thead>
        <tbody>
          {adoptions.map((adoption) => (
            <tr key={adoption.id}>
              <td>{adoption.id}</td>
              <td>{adoption.child_name}</td>
              <td>{adoption.parent_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdoptionList;
