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

export const subjects = [
  "Physics",
  "Mathematics",
  "Chemistry",
  "Biology",
  "Further mathematics",
  "ICT",
  "Computer sc",
  "English",
  "French",
  "Additional mathematics",
  "History",
  "Geography",
  "Economics",
  "Literature",
];

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

export const backend_url = "http://localhost:3002";

export const backendApi = axios.create({
  baseURL: backend_url,
  withCredentials: true,
});
