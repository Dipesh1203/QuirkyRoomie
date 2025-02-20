import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

// Add JWT to requests
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const fileComplaint = (data) => API.post("/complaints", data);
export const getComplaints = () => API.get("/complaints");
export const voteComplaint = (id, type) =>
  API.post(`/complaints/${id}/vote`, { type });
export const resolveComplaint = (id) => API.put(`/complaints/${id}/resolve`);
export const getTrendingComplaints = () => API.get("/complaints/trending");
export const getLeaderboard = () => API.get("/leaderboard");
export const getStats = () => API.get("/flat/stats");
