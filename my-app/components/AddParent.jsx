import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addParent } from "./api";
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
  form: {
    display: 'grid',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#4a5568',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '2px solid #e2e8f0',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  inputFocus: {
    borderColor: '#3498db',
    boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.1)'
  },
  error: {
    color: '#e53e3e',
    backgroundColor: '#fff5f5',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    border: '1px solid #feb2b2',
    marginBottom: '10px'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '10px'
  },
  buttonHover: {
    backgroundColor: '#2980b9',
    transform: 'translateY(-1px)'
  },
  buttonActive: {
    transform: 'translateY(1px)'
  },
  passwordContainer: {
    position: 'relative'
  },
  passwordToggle: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#718096',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '4px'
  }
};

function AddParent() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !username || !email || !password) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Add a New Parent</h2>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
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
            placeholder="Enter your full name"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.input,
              ...(focusedField === 'username' ? styles.inputFocus : {})
            }}
            placeholder="Choose a username"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.input,
              ...(focusedField === 'email' ? styles.inputFocus : {})
            }}
            placeholder="Enter your email address"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...styles.input,
                ...(focusedField === 'password' ? styles.inputFocus : {})
              }}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              {showPassword ? '🔒' : '👁️'}
            </button>
          </div>
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
          {isSubmitting ? 'Adding Parent...' : 'Add Parent'}
        </button>
      </form>
    </div>
  );
}

export default AddParent;


