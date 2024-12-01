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

export const ordinarySubjects = [
  "Physics",
  "Mathematics",
  "Chemistry",
  "Biology",
  "Computer sc",
  "English",
  "French",
  "Additional mathematics",
];

export const advancedSubjects = [
  "Physics",
  "Mathematics",
  "Chemistry",
  "Biology",
  "Further mathematics",
  "ICT",
  "Computer sc",
  "English",
  "French",
];

export const subjects = Array.from(
  new Set(ordinarySubjects.concat(advancedSubjects))
);

export const year = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
];

export const paper = ["1", "2", "3"];

export const backend_url =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://mentorguru.onrender.com";

if (!backend_url) {
  throw new Error("backend url is not set.");
}

export const backendApi = axios.create({
  baseURL: backend_url,
  withCredentials: true,
});

export const ROLES = {
  ADMIN: "1010",
  USER: "1050",
  STUDENT: "5050",
};
