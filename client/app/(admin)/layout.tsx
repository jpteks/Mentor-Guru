import MobileNav from "./components/MobileAdminNav";
import SiderBar from "./components/Sidebar";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
