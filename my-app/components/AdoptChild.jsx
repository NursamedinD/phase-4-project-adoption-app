import React, { useState, useEffect } from "react";
import { fetchChildren, fetchParents, createAdoption } from "./api.jsx";


const styles = {
  container: {
    padding: '24px',
    maxWidth: '500px',
    margin: '40px auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#2c3e50',
    textAlign: 'center',
    borderBottom: '3px solid #3498db',
    paddingBottom: '10px',
    display: 'inline-block'
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#4a5568',
    marginBottom: '4px'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '2px solid #e2e8f0',
    fontSize: '0.95rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  selectFocus: {
    borderColor: '#3498db',
    boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.1)'
  },
  selectDisabled: {
    backgroundColor: '#f7fafc',
    cursor: 'not-allowed',
    opacity: 0.7
  },
  button: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '10px'
  },
  buttonHover: {
    backgroundColor: '#2980b9'
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed'
  },
  error: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#fff5f5',
    color: '#e53e3e',
    borderRadius: '6px',
    fontSize: '0.9rem',
    border: '1px solid #feb2b2'
  }
};


const AdoptChild = () => {
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [selectedParent, setSelectedParent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [buttonHovered, setButtonHovered] = useState(false);


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
      const response = await createAdoption(selectedChild, selectedParent);
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
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Adopt a Child</h2>
      </div>


      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="child" style={styles.label}>
            Select Child
          </label>
          <select
            id="child"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            onFocus={() => setFocusedField('child')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.select,
              ...(focusedField === 'child' ? styles.selectFocus : {}),
              ...(loading ? styles.selectDisabled : {})
            }}
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


        <div style={styles.formGroup}>
          <label htmlFor="parent" style={styles.label}>
            Select Parent
          </label>
          <select
            id="parent"
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
            onFocus={() => setFocusedField('parent')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.select,
              ...(focusedField === 'parent' ? styles.selectFocus : {}),
              ...(loading ? styles.selectDisabled : {})
            }}
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
          disabled={loading}
          style={{
            ...styles.button,
            ...(buttonHovered && !loading ? styles.buttonHover : {}),
            ...(loading ? styles.buttonDisabled : {})
          }}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          {loading ? 'Processing...' : 'Submit Adoption'}
        </button>
      </form>


      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default AdoptChild;