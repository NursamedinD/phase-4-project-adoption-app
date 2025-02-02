import React, { useState, useEffect } from "react";
import { fetchChildren, fetchParents, createAdoption } from "./api.jsx";

const AdoptChild = () => {
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [selectedParent, setSelectedParent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [childrenData, parentsData] = await Promise.all([
          fetchChildren(),
          fetchParents()
        ]);
        setChildren(childrenData);
        setParents(parentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    
    if (!selectedChild || !selectedParent) {
      setError("Please select both a child and a parent");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending adoption request with:", {
        childId: selectedChild,
        parentId: selectedParent
      });
      const response = await createAdoption(selectedChild, selectedParent);
      console.log("Adoption response:", response);

      
      setSelectedChild("");
      setSelectedParent("");
      alert("Adoption request submitted successfully!");
    } catch (error) {
      console.error("Error creating adoption:", error);
      setError(error.message || "Failed to create adoption");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Adopt a Child</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="child" className="block text-sm font-medium text-gray-700">
            Select Child
          </label>
          <select
            id="child"
            value={selectedChild}
            onChange={(e) => {
              const value = e.target.value;
              console.log("Selected child ID:", value);
              setSelectedChild(value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            disabled={loading}
          >
            <option value="">Select a child</option>
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
            Select Parent
          </label>
          <select
            id="parent"
            value={selectedParent}
            onChange={(e) => {
              const value = e.target.value;
              console.log("Selected parent ID:", value);
              setSelectedParent(value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            disabled={loading}
          >
            <option value="">Select a parent</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Adoption'}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}    
    </div>
  );
};

export default AdoptChild;


