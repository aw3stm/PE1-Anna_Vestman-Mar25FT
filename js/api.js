export const BASE_URL = "https://v2.api.noroff.dev/";
export const API_KEY = "b8966aae-081d-4884-bf1e-981be4b07a56";

export function authHeaders() {
 const token = localStorage.getItem("token");

 return {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  "X-Noroff-API-Key": API_KEY,
 };
}
