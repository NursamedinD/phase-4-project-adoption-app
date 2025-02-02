import { submitAdoptionRequest } from "../components/api";
import React from "react";

function AdoptedForm({ childId }) {
    const handleAdopt = () => {
        submitAdoptionRequest(childId).then(() => alert("Adoption request sent!"));
    }

    return <button onClick={handleAdopt}>Adopt</button>
}

export default AdoptedForm;