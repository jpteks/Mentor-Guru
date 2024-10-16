import VideoPlayer from "@/app/(courses)/components/videoPlayer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import {
  BookMarked,
  ChevronDown,
  CircleCheck,
  Pause,
  Play,
  Share,
} from "lucide-react";

const Video = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  // check if user is auth is not redirect to "/"
  return (
    <div className='grow'>
      <div>Bread Crumb {params.courseId} </div>

      <div className='border md:grid  md:grid-cols-[3fr_1fr]  '>
        {/* -----------------------------------------------------------video player------------------------------------------- */}
        <div className='h-screen px-6 mb-9 '>
          <h1 className='text-3xl font-bold '>Contact Forces</h1>
          <div className='border mt-1'>
            <VideoPlayer />
          </div>
          {/* instructor profile */}
          <div className='flex justify-between items-center mt-2'>
            <div className='flex justify-between items-center gap-2'>
              <Avatar className='w-7 h-8 rounded-md'>
                <AvatarImage src='/google.svg' className='object-cover' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='text-xs'>
                <p className='font-bold text-sm'>Simon jackson</p>
                <p>Mentor.Physics teacher</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <Share className='w-5 h-5' />
              <BookMarked className='w-5 h-5' />
            </div>
          </div>
          {/* desscription */}
          <div className='text-sm mt-5'>
            <h3 className='font-bold pb-4 text-md'>About this course</h3>
            <p className='font-sans leading-6 text-slate-700 dark:text-slate-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quidem.Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quiLorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quidem.dem.Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quisquam,
              quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quidem.
            </p>
            <div className='flex items-center text-orange-500'>
              show more <ChevronDown className='w-5 h-5' />
            </div>
          </div>
        </div>

        {/*---------------------------------------------------------------------- course progress ------------------------- */}
        <div className='grid grid-rows-[1fr_3fr] p-4 gap-3'>
          <Card className='text-xs '>
            <CardHeader>
              <CardTitle>
                Your study Pogress <span>5%</span>
              </CardTitle>
            </CardHeader>
          </Card>
          <div className='text-sm flex flex-col gap-3'>
            <div className='border rounded-lg p-2 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Play className='text-blue-600' />
                <div className='text-xs'>
                  <p className='font-bold'>Introduction</p>
                  <p>20 min</p>
                </div>
              </div>

              <CircleCheck className='text-green-700' />
            </div>

            <div className='border rounded-lg p-2 flex items-center justify-between bg-blue-600'>
              <div className='flex items-center gap-2'>
                <Pause className='text-white' />
                <div className='text-xs text-white'>
                  <p className='font-bold '>Contact Forces</p>
                  <p>10 min</p>
                </div>
              </div>

              {/* <CircleCheck className='text-green-700' /> */}
            </div>

            <div className='border rounded-lg p-2 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Play className='text-blue-600' />
                <div className='text-xs'>
                  <p className='font-bold'>Moments</p>
                  <p>1h</p>
                </div>
              </div>

              {/* <CircleCheck className='text-green-700' /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
