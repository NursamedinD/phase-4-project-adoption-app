import {submitAdoptionForm} from "../api";

function AdoptedForm({ childId }) {
    const handleAdopt = () => {
        submitAdoptionForm(childId).then(() => alert("Adoption request sent!"));
    }

    return <button onClick={handleAdopt}>Adopt</button>
}

export default AdoptedForm;