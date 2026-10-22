import { api } from "./axios";

const AUTH_BASE = "/api/v1/user";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerUserApi = async (payload: RegisterPayload) => {
  const res = await api.post(`${AUTH_BASE}/register`, payload);
  return res.data;
};

export const loginUserApi = async (payload: LoginPayload) => {
  const res = await api.post(`${AUTH_BASE}/login`, payload);
  return res.data; // { success, message, data: { user, token } }
};