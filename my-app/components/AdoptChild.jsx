import React, { useState, useEffect } from "react";
import { fetchChildren } from "./api";
import { fetchParents } from "./api";
import { submitAdoptionRequest } from "./api";

function AdoptChild() {
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [selectedParent, setSelectedParent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadChildren = async () => {
      const fetchedChildren = await fetchChildren();
      setChildren(fetchedChildren);
    };

    const loadParents = async () => {
      const fetchedParents = await fetchParents();
      setParents(fetchedParents);
    };

    loadChildren();
    loadParents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedChild || !selectedParent) {
      setError("Both child and parent must be selected.");
      return;
    }

    try {
      await submitAdoptionRequest(selectedChild, selectedParent);
      setSuccess("Adoption request submitted successfully.");
      setError("");
    } catch (err) {
      setError("An error occurred while submitting adoption.");
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Adopt a Child</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="child">Select Child:</label>
          <select
            id="child"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            <option value="">--Select Child--</option>
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="parent">Select Parent:</label>
          <select
            id="parent"
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
          >
            <option value="">--Select Parent--</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Submit Adoption</button>
      </form>
    </div>
  );
}

export default AdoptChild;
