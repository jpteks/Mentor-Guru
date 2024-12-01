import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CardBox = () => {
  return (
    <div className=' text-black rounded-[8px] bg-gradient-to-r from-red-500 to-red-500 p-[2px] w-80 '>
      <div className='relative rounded-[8px] w-full h-full flex flex-col items-center justify-center gap-2  bg-white p-6 shadow-lg'>
        <div className='absolute -top-8 left-[40%] w-16 h-16 rounded-full overflow-hidden border dark:border-none mb-4 bg-white flex items-center justify-center'>
          <Avatar>
            <AvatarImage
              src='https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvY0HIWELvZowzOpsYWD1jXQ3evFdluRHbPTtNa'
              alt='@shadcn'
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h3 className='text-sm mt-1 font-semibold'>Cyrille tchoufo </h3>
        <p className='text-center mt-2 text-slate-500 text-sm '>
          Lorem Ipsum has been the industry’s standard dummy text of the
          printing and typesetting industry. It has survived not only five
          centuries but also the leap into electronic typesetting.
        </p>
      </div>
    </div>
  );
};

export default CardBox;
