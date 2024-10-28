import axios from "axios";

export const Region = [
  "Littoral",
  "Center",
  "North",
  "South West",
  "North West",
  "East",
  "West",
  "Far North",
  "Adamawa",
  "South",
];

export const backend_url = "http://localhost:3002";

export const coursesApi = axios.create({
  baseURL: backend_url,
});
