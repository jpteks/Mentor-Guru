import { cookies } from "next/headers";
import MobileNav from "./components/MobileAdminNav";
import SiderBar from "./components/Sidebar";
import { verifyTokenAction } from "@/actions/verifyTokenAction";
import { redirect } from "next/navigation";

export default async function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("refreshToken")?.value;

  const payload = token && (await verifyTokenAction(token));

  if (payload) {
    if (payload?.role !== "admin") {
      redirect("/courses");
    }
  }

  return (
    <div className='flex items-start flex-col md:flex-row justify-center'>
      <div className=' min-h-screen w-[250px] flex-row min-w-[250px] hidden lg:block'>
        <SiderBar />
      </div>
      <MobileNav />
      <main className='w-full flex flex-col min-h-screen'>{children}</main>
    </div>
  );
}
