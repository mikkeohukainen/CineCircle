import { api } from "./api";

export async function sendRequest(groupId, userId) {
  const { data } = await api.post(`/groups/${groupId}/members`, {
    userId,
  });
  return data;
}