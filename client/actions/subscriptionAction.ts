"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };

  console.log(rawFormData);
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
