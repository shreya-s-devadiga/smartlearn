import axios from "axios";

// ✅ Create backend API instance
export const API = axios.create({
  baseURL: "http://localhost:8080", // Make sure backend runs here
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================
// ✅ AUTHENTICATION
// ============================

// ✅ Login (fixed version)
export function login({ username, password }) {
  // Sends proper JSON body expected by Spring Boot
  return API.post("/api/users/login", { username, password });
}

// ✅ Register
export function register(data) {
  return API.post("/api/users/register", data);
}

// ============================
// ✅ ADMIN DASHBOARD
// ============================

// ✅ Dashboard Stats (User count, total lessons, rewards)
export function getDashboardStats() {
  return API.get("/api/admin/dashboard");
}

// ✅ Get All Users
export function getAllUsers() {
  return API.get("/api/admin/users");
}

// ✅ Delete User by ID
export function deleteUser(id) {
  return API.delete(`/api/admin/users/${id}`);
}

// ✅ Get User Lesson Stats (lessons per user)
export function getLessonStats() {
  return API.get("/api/admin/lesson-stats");
}

// ✅ Get Detailed User Progress (lessons + rewards)
export function getUserProgress() {
  return API.get("/api/admin/user-progress");
}

// ============================
// ✅ EMOTION ANALYZER
// ============================

export function analyzeEmotion(text) {
  return API.post("/api/emotion/analyze", { text });
}

// ============================
// ✅ REWARDS SYSTEM
// ============================

// ✅ Get rewards for specific user
export function getUserReward(userId) {
  return API.get(`/api/rewards/user/${userId}`);
}

// ✅ Add reward points to user
export function addReward(userId, points) {
  return API.post(`/api/rewards/add?userId=${userId}&points=${points}`);
}
