import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchChildren } from "./api";
import React from "react";

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    color: '#2c3e50',
    fontSize: '1.8rem',
    marginBottom: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '3px solid #3498db',
    paddingBottom: '10px',
    display: 'inline-block'
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#4a5568',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
    outline: 'none'
  },
  inputFocus: {
    borderColor: '#3498db'
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '1rem',
    minHeight: '120px',
    resize: 'vertical',
    transition: 'border-color 0.2s ease',
    outline: 'none'
  },
  error: {
    color: '#e53e3e',
    backgroundColor: '#fff5f5',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '0.9rem',
    border: '1px solid #feb2b2'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    width: '100%',
    fontWeight: '500'
  },
  buttonHover: {
    backgroundColor: '#2980b9'
  },
  buttonActive: {
    transform: 'translateY(1px)'
  }
};

function AddChild() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
 
    if (!name || !age || !description) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }
 
    const newChild = {
      name,
      age,
      description,
    };
 
    try {
      const response = await fetch("https://phase-4-project-backend-api-2.onrender.com/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChild),
      });
 
      if (response.ok) {
        navigate("/children");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add child.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred while adding the child.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Add a New Child</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.input,
              ...(focusedField === 'name' ? styles.inputFocus : {})
            }}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="age" style={styles.label}>Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onFocus={() => setFocusedField('age')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.input,
              ...(focusedField === 'age' ? styles.inputFocus : {})
            }}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.textarea,
              ...(focusedField === 'description' ? styles.inputFocus : {})
            }}
          ></textarea>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.button,
            ...(buttonHovered ? styles.buttonHover : {}),
            ...(buttonActive ? styles.buttonActive : {}),
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => {
            setButtonHovered(false);
            setButtonActive(false);
          }}
          onMouseDown={() => setButtonActive(true)}
          onMouseUp={() => setButtonActive(false)}
        >
          {isSubmitting ? 'Adding Child...' : 'Add Child'}
        </button>
      </form>
    </div>
  );
}

export default AddChild;

