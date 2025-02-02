import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { fetchAdoptedChildren } from "../components/api"; 
import React from "react";

function AdoptedChildren() {
    const [children, setChildren] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchAdoptedChildren().then(setChildren);
    }, []);

    return (
        <div>
            <h2>Adopted Children</h2>
            {children.length === 0 ? (
                <p>No children adopted yet.</p>
            ) : (
                <ul>
                    {children.map((child) => (
                        <li key={child.id}>
                            <strong>{child.name}</strong> - {child.age} years old
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdoptedChildren;
