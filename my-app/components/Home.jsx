import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { fetchChildren } from "./api.jsx";
import React from "react";
import AdoptionForm from "./AdoptionForm.jsx"

function Home() {
    const [children, setChildren] = useState([]);

    useEffect(() => {
        fetchChildren().then(setChildren);
    }, [])

    return (
        <div>
            <h2>Children Available for Adoption</h2>
            {children.map((child) => (
                <div key={child.id}>
                    <h3>{child.name}</h3>
                    <p>Age: {child.age}</p>
                    <Link to={`/child/${child.id}`}>View More</Link>
                </div>
            ))}
            <AdoptionForm />
        </div>
    );
}

export default Home;