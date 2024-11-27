"use client"
import { Button } from "@/components/ui/button";
import Header from "./Header";
import TypeAnime from "./TypeAnime";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const handleBtnClick = (url: string) => {
    router.push(url);
  };
  return (
    <section className='bg-cover bg-gradient-to-r  from-blue-500  to-blue-50 dark:bg-none bg-center min-h-screen flex flex-col  justify-between   transition-colors duration-300 p-6 rounded-br-full '>
      <div className='mt-5'>
        <Header />
      </div>
      <div className='flex-1 flex  relative'>
        <div className='flex flex-col items-center justify-center flex-1 '>
          <h1 className='text-4xl md:text-6xl p-3  font-black z-10 text-center text-white '>
            Start Learning from <TypeAnime /> <br /> & Talented
            <span className='text-orange-500'> Tutors.</span>
          </h1>
          <div className='flex flex-wrap items-center justify-center gap-3 md:gap-0 px-3  space-x-4 mt-8 z-10'>
            <Button
              variant={"outline"}
              size={"lg"}
              //className='bg-blue-500 text-white px-12 py-4 rounded-md hover:bg-blue-600 transition'
              className=' text-white w-full md:w-32 dark:border-orange-500 bg-transparent'
            >
              Join Us Now
            </Button>

            <Button
              size={"lg"}
              onClick={() => handleBtnClick("/courses")}
              className='bg-orange-500 text-white w-full md:w-32  rounded-md hover:bg-orange-600 transition'
            >
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
