import api from "./api";

export async function register(username, password, confirmPw) {
  return api.post("/users", {
    username,
    password,
    confirmPw,
  });
}

export async function login(username, password) {
  const { data } = await api.post("/users/session", { username, password });
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
}
