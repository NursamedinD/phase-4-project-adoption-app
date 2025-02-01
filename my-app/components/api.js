const API_URL = "http://127.0.0.1:5555/";

export const fetchChildren = async () => fetch(`${API_URL}/children`).then(res => res.json());
export const fetchChildById = async (id) => fetch(`${API_URL}/children/${id}`).then(res => res.json());
export const loginUser = async (data) => fetch(`${API_URL}/login`, { method: "POST", body: JSON.stringify(data) });
export const registerUser = async (data) => fetch(`${API_URL}/signup`, { method: "POST", body: JSON.stringify(data) });
export const submitAdoptionRequest = async (childId) => fetch(`${API_URL}/adopt`, { method: "POST", body: JSON.stringify({ childId }) });
export const fetchAdoptedChildren = async () => fetch(`${API_URL}/adopted-children`).then(res => res.json());
