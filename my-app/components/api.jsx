const API_URL = "http://127.0.0.1:5555";

export const fetchChildren = async () => {
  try {
    const response = await fetch(`${API_URL}/children`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching children:", error);
    return []; 
  }
};

export const fetchChildById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/children/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching child with ID ${id}:`, error);
    return null; 
  }
};

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

export const submitAdoptionRequest = async (childId, userId) => {
  try {
    const response = await fetch(`${API_URL}/adopt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ childId, userId }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error submitting adoption request:", error);
    return null;
  }
};

export const fetchAdoptedChildren = async () => {
  try {
    const response = await fetch(`${API_URL}/adopted-children`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching adopted children:", error);
    return []; 
  }
};
