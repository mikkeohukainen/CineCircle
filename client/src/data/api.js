import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const xmlParser = new XMLParser();

export const finnkino = axios.create({
  baseURL: "https://www.finnkino.fi/xml",
  transformResponse: (xml) => {
    try {
      return xmlParser.parse(xml);
    } catch (error) {
      return null;
    }
  },
});

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
