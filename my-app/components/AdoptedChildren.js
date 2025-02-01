import { useEffect, useState} from "react-router-dom";
import { fetchAdoptedChildren } from "../api";

function AdoptedChildren() {
    const [children, setChildren] = useState([]);

    useEffect(() => {
        fetchAdoptedChildren().then(setChildren);
    })

    return (
        <div>
            <h2>Adopted Children</h2>
            {children.length === 0 ? <p>No children adopted yet.</p> : 
            children.map((child) => <p key={child.id}>{child.id}</p>)}
        </div>
    );
}

export default AdoptedChildren;