// Application Configuration Constants
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  DOCTOR: "/doctor",
  PATIENT: "/patient",
  APPOINTMENT: "/appointment",
  DEPARTMENT: "/department",
  TEST: "/test",
  SERVICE: "/service",
  MEDICINE: "/medicine",
  PRESCRIPTION: "/prescription",
  REQUEST: "/request",
  EDIT_PROFILE: "/edit-profile",
};

export const ROLES = {
  ADMIN: "admin",
  DOCTOR: "doctor",
  PATIENT: "patient",
};

export default {
  API_URL,
  ROUTES,
  ROLES,
};

