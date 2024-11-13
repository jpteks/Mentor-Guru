//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardCourse from "../components/Card";

export default function Courses() {
  return (
    <>
      {/* <Tabs defaultValue='all' className='w-full '>
        <TabsList className=' py-6 px-4 flex items-center justify-start gap-3 text-xs'>
          <TabsTrigger
            value='all'
            className='border py-2 rounded-lg text-center shadow-lg hover:bg-slate-100 hover:text-black'
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value='ordinary'
            className='border py-2 rounded-lg text-center shadow-lg hover:bg-slate-100 hover:text-black'
          >
            <p>Ordinary level</p>
          </TabsTrigger>
          <TabsTrigger
            value='advanced'
            className='border py-2 rounded-lg text-center shadow-lg hover:bg-slate-100 hover:text-black'
          >
            <p>Advanced level</p>
          </TabsTrigger>
          <TabsTrigger
            value='advanced'
            className='border py-2 rounded-lg text-center shadow-lg hover:bg-slate-100 hover:text-black'
          >
            <p>Popular</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='all'>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-2 px-4 pt-4'>
            <CardCourse />
            <CardCourse />
            <CardCourse />
            <CardCourse />
            <CardCourse />
            <CardCourse />
            <CardCourse />
            <CardCourse />
            <CardCourse />
          </div>
        </TabsContent>
        <TabsContent value='ordinary'>Odinary courses</TabsContent>
        <TabsContent value='advanced'>Advanced courses</TabsContent>
      </Tabs> */}
      <div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-2 px-4 pt-4'>
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
        </div>
      </div>
    </>
  );
}
