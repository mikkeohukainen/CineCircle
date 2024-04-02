import api from "./api";

export async function login(username, password) {
  const { data } = await api.post("/users/session", { username, password });
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
}
