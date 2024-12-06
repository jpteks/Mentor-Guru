"use server";

import { verifyToken } from "@/utils/verifyToken";



export async function verifyTokenAction(token: string) {
  try {
    //TODO

    return verifyToken(token);
  } catch (error) {
    console.error("Error in getPaperAction:", error);
    return { id: "", role: "" };
  }
}
