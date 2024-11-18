import axios from "axios";

const API = axios.create({
  baseURL: "https://stayfit-usra.onrender.com",
});

// export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignUp = async (data) => {
  try {
      console.log("Sending data:", data);
      const response = await API.post("/user/signup", data);
      console.log("API response:", response); // Log full API response
      return response;
  } catch (error) {
      console.error("API error:", error); // Log any API errors
      throw error;
  }
};


// export const UserSignIn = async (data) => API.post("/user/signin", data);
export const UserSignIn = async (data) => {
  try {
      const response = await API.post("/user/signin", data);
      console.log("API response:", response); // Log full API response
      return response;
  } catch (error) {
      console.error("API error:", error); // Log any API errors
      throw error;
  }
};


export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
