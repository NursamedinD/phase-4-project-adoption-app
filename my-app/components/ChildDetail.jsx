import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchChildById } from "./api.jsx"
import React from "react";

function ChildDetail() {
    const { id } = useParams();
    const [child, setChild] = useState(null)

    useEffect(() => {
        fetchChildById(id).then(setChild);
    }, [id]);

    if (!child) return <p>Loading...</p>;

    return (
        <div>
        <h2>{child.name}</h2>
        <p>Age: {child.age}</p>
        <p>{child.description}</p>
        <AdoptionForm childId={child.id} />
        </div>
    )
}

export default ChildDetail;