import SiderBar from "./components/Sidebar";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex items-start justify-center'>
      <div className=' min-h-screen w-[250px] min-w-[250px] hidden lg:block'>
        <SiderBar />
      </div>
      <main className='w-full flex flex-col min-h-screen'>{children}</main>
    </div>
  );
}
