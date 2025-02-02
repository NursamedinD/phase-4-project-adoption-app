import React, { useState, useEffect } from "react";
import { fetchAdoptedChildren } from "./api";


const AdoptedList = () => {
  const [adoptedChildren, setAdoptedChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const loadAdoptedChildren = async () => {
      try {
        setLoading(true);
        const data = await fetchAdoptedChildren();
        console.log("Fetched data:", data);
        setAdoptedChildren(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    loadAdoptedChildren();
  }, []);


  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '2rem',
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    tableContainer: {
      overflowX: 'auto',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      border: '1px solid #ddd'
    },
    th: {
      backgroundColor: '#f5f6fa',
      color: '#2c3e50',
      padding: '15px',
      textAlign: 'left',
      borderBottom: '2px solid #ddd',
      fontSize: '0.9rem',
      fontWeight: 'bold'
    },
    td: {
      padding: '12px 15px',
      borderBottom: '1px solid #ddd',
      color: '#2c3e50'
    },
    loadingSpinner: {
      textAlign: 'center',
      padding: '2rem',
      color: '#2c3e50'
    },
    error: {
      textAlign: 'center',
      padding: '1rem',
      color: '#e74c3c',
      backgroundColor: '#fde8e8',
      border: '1px solid #f5b7b1',
      borderRadius: '4px',
      margin: '1rem 0'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '15px',
      fontSize: '0.85rem',
      fontWeight: '500',
      display: 'inline-block'
    },
    adoptedStatus: {
      backgroundColor: '#d4edda',
      color: '#155724'
    },
    pendingStatus: {
      backgroundColor: '#fff3cd',
      color: '#856404'
    },
    emptyMessage: {
      textAlign: 'center',
      padding: '2rem',
      color: '#6c757d',
      fontSize: '1.1rem'
    }
  };


  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingSpinner}>Loading adoption records...</div>
      </div>
    );
  }


  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>Error: {error}</div>
      </div>
    );
  }


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Adopted Children Registry</h2>
      <h5 style={styles.title}>Welcome to the Adoptify. Our Goal is to forge bonds between parents and children to create long loving relationships and a home.</h5>

      {adoptedChildren.length === 0 ? (
        <div style={styles.emptyMessage}>
          No adopted children records found.
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Child Name</th>
                <th style={styles.th}>Parent Name</th>
                <th style={styles.th}>Adoption Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {adoptedChildren.map((adoption) => (
                <tr key={adoption.id}>
                  <td style={styles.td}>{adoption.id}</td>
                  <td style={styles.td}>{adoption.child_name}</td>
                  <td style={styles.td}>{adoption.parent_name}</td>
                  <td style={styles.td}>
                    {new Date(adoption.adoption_date).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <span 
                      style={{
                        ...styles.statusBadge,
                        ...(adoption.status === "Adopted" 
                          ? styles.adoptedStatus 
                          : styles.pendingStatus)
                      }}
                    >
                      {adoption.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


export default AdoptedList;