import { useState, useEffect } from "react";
import { fetchChildren } from "./api";
import React from "react";


const styles = {
  container: {
    maxWidth: '1100px',
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
  error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '12px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    border: '1px solid #fecaca'
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem',
    padding: '40px 0',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px dashed #cbd5e1'
  },
  tableContainer: {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  th: {
    backgroundColor: '#f8fafc',
    color: '#334155',
    padding: '16px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #e2e8f0',
    fontSize: '0.95rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #e2e8f0',
    color: '#475569',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  tr: {
    transition: 'background-color 0.2s ease'
  },
  trHover: {
    backgroundColor: '#f1f5f9'
  },
  description: {
    maxWidth: '400px',
    lineHeight: '1.6'
  },
  age: {
    fontWeight: '500',
    color: '#3b82f6'
  },
  name: {
    fontWeight: '500',
    color: '#1e293b'
  }
};


function ChildList() {
  const [children, setChildren] = useState([]);
  const [error, setError] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);


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
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>List of Children</h2>
      </div>
      
      {error && <div style={styles.error}>{error}</div>}


      {children.length === 0 ? (
        <div style={styles.emptyMessage}>No children available</div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr
                  key={child.id}
                  style={{
                    ...styles.tr,
                    ...(hoveredRow === child.id ? styles.trHover : {})
                  }}
                  onMouseEnter={() => setHoveredRow(child.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={{...styles.td, ...styles.name}}>{child.name}</td>
                  <td style={{...styles.td, ...styles.age}}>{child.age}</td>
                  <td style={{...styles.td, ...styles.description}}>{child.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


export default ChildList;





