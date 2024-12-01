import Image from "next/image";

function DashboardSnippet() {
  return (
    <div className=' py-20 rounded-xl'>
      <div className='w-full aspect-video relative md:max-w-3xl mx-auto'>
        <Image
          priority
          src={"/ds2.png"}
          alt='snippet'
          sizes='100vw'
          fill
        />
      </div>
    </div>
  );
}

export default DashboardSnippet;
