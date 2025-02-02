import { useState, useEffect } from "react";
import { fetchParents } from "./api";
import React from "react";

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '2.2rem',
    marginBottom: '30px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: '3px solid #3498db',
    paddingBottom: '10px',
    display: 'inline-block'
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem',
    padding: '40px 0',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px dashed #cbd5e1',
    margin: '20px 0'
  },
  cardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '0',
    margin: '0',
    listStyle: 'none'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    border: '1px solid #e2e8f0'
  },
  cardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  name: {
    margin: '0 0 10px 0',
    color: '#2c3e50',
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  username: {
    color: '#64748b',
    fontSize: '0.95rem',
    marginBottom: '8px',
    display: 'block'
  },
  email: {
    color: '#3498db',
    fontSize: '0.95rem',
    textDecoration: 'none',
    display: 'block',
    wordBreak: 'break-all'
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
  },
  label: {
    color: '#64748b',
    fontSize: '0.9rem',
    marginRight: '8px',
    minWidth: '80px'
  },
  value: {
    color: '#334155',
    fontSize: '0.95rem',
    flex: '1'
  }
};

function ParentList() {
  const [parents, setParents] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

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
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>List of Parents</h2>
      </div>

      {parents.length === 0 ? (
        <div style={styles.emptyMessage}>No parents added yet.</div>
      ) : (
        <ul style={styles.cardList}>
          {parents.map((parent) => (
            <li 
              key={parent.id}
              style={{
                ...styles.card,
                ...(hoveredCard === parent.id ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredCard(parent.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={styles.name}>{parent.name}</h3>
              <div style={styles.infoRow}>
                <span style={styles.label}>Username:</span>
                <span style={styles.value}>{parent.username}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.label}>Email:</span>
                <a 
                  href={`mailto:${parent.email}`} 
                  style={{...styles.value, ...styles.email}}
                >
                  {parent.email}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ParentList;


