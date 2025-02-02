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

export const createAdoption = async (childId, parentId) => {
    if (!parentId || !childId) {
      console.error("Missing childId or parentId", { childId, parentId });
      throw new Error("Missing childId or parentId");
    }
  
    try {
      const response = await fetch(`${API_URL}/adoptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parentId, childId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating adoption");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error creating adoption:", error);
      throw error;
    }
  };
  
  export const fetchAdoptedChildren = async () => {
    try {
      const response = await fetch(`${API_URL}/adopted-children`);
      if (!response.ok) {
        throw new Error('Failed to fetch adopted children');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  

export const addParent = async (parentData) => {
  try {
    const response = await fetch(`${API_URL}/parents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parentData),
    });
    return response;
  } catch (error) {
    console.error("Error adding parent:", error);
    throw error;
  }
};

export const fetchParents = async () => {
  try {
    const response = await fetch(`${API_URL}/parents`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching parents:", error);
    return [];
  }
};

