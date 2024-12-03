import ProfilePageSidebar from "../../components/profile-sidebar";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex items-start flex-col md:flex-row justify-center'>
      <div className='md:w-[400px] w-full md:min-w-[250px] '>
        <ProfilePageSidebar />
      </div>
      <main className='w-full flex flex-col min-h-screen'>{children}</main>
    </div>
  );
}
