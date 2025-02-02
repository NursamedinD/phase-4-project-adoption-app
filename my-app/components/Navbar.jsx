import { Link } from "react-router-dom";
import React, { useState } from "react";


const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '12px 24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: '#fff',
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif'
  },
  nav: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    display: 'block'
  },
  linkHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#3498db'
  },
  activeLink: {
    backgroundColor: '#3498db',
    color: 'white'
  }
};


function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);


  return (
    <div style={styles.navbar}>
      <div style={styles.container}>
        <h1 style={styles.title}>Adoptify</h1>
        <nav style={styles.nav}>
          {[
            { to: "/", text: "Adoption List" },
            { to: "/add-child", text: "Add Child" },
            { to: "/children", text: "Children" },
            { to: "/add-parent", text: "Add Parent" },
            { to: "/parents", text: "Parents" },
            { to: "/adopt-child", text: "Adopt" }
          ].map((link) => (
            <button key={link.to} style={styles.button}>
              <Link
                to={link.to}
                style={{
                  ...styles.link,
                  ...(hoveredLink === link.to ? styles.linkHover : {})
                }}
                onMouseEnter={() => setHoveredLink(link.to)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.text}
              </Link>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}


export default Navbar;