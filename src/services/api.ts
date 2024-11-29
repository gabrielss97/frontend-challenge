import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

if (!BASE_URL || !TOKEN) {
  throw new Error("Missing environment variables");
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
