import axios from "axios";

const API = axios.create({
  // --- CHANGE THIS LINE ---
  baseURL: "http://localhost:5000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;



// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://rewearserverlatest.onrender.com/api", // ⚠️ Your backend running port
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default API;