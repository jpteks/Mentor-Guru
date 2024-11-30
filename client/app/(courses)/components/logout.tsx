"use client";
import { backendApi } from "@/app/constant";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Logout = () => {
  const logout = async () => {
    try {
      await backendApi.post("/auth/logout");
      toast.success("Logout Success");
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };
  return (
    <div className=' py-3 dark:border-neutral-600 grid '>
      <Button
        onClick={logout}
        variant={"outline"}
        className='flex rounded-md hover:bg-red-500 dark:bg-transparent'
      >
        <LogOut className='mr-2 ' size={16} />
        Logout
      </Button>
    </div>
  );
};

export default Logout;
