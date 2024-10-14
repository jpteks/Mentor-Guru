import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  ArrowBigRight,
  ArrowRight,
  Badge,
  Check,
  Star,
  User,
  Video,
} from "lucide-react";

const Course = () => {
  return (
    <div className='p-2 h-full'>
      <Card
        className='border w-full h-[200px]  rounded-md bg-center bg-no-repeat'
        style={{ background: "url('/Hexagon.svg')" }}
      >
        <CardHeader>
          <CardDescription className='flex text-xs font-semibold items-center'>
            Yebga Ruben
            <Badge className='p-1 w-7 h-7 text-blue-400'>
              <Check className='w-3 h-3' />
            </Badge>
          </CardDescription>
          <CardTitle className='text-white text-3xl'>
            Moment Of a Force
          </CardTitle>
          <CardDescription>
            This courses introduce the concept, principles of moment
          </CardDescription>
        </CardHeader>
        <CardContent className='flex gap-2'>
          <Button className='bg-white text-black'>Watch Preview</Button>
          <Button className='bg-white text-black'>Enroll Courses</Button>
        </CardContent>
      </Card>
      {/* ---------------------------------------------------------Courses bento grid -----------------------------------------------------*/}
      <div className='grid md:grid-cols-[2fr_minmax(150px,_1fr)] mt-2 gap-3 p-2 '>
        {/* Courses Videos */}
        <Card className='border p-2 '>
          <div className='flex items-center justify-start'>
            <Button className='bg-white text-black' size='icon'>
              <Star className='w-5 h-5' />
            </Button>

            <CardHeader>
              <CardTitle>Courses Overview</CardTitle>
              <CardDescription>
                9 sections . 41 lectures . 3H47m
              </CardDescription>
            </CardHeader>
          </div>

          <div className='border rounded-md'>
            <Accordion
              type='single'
              collapsible
              className='flex flex-col gap-2'
            >
              <AccordionItem value='item-1'>
                <AccordionTrigger className='flex items-center justify-between px-2 bg-slate-200 dark:bg-inherit'>
                  Getting Started
                </AccordionTrigger>
                <AccordionContent className='flex gap-2 text-sm text-slate-500 px-2'>
                  <Video /> courses intro video
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='item-2'>
                <AccordionTrigger className='flex items-center justify-between px-2 bg-slate-200 dark:bg-inherit'>
                  Forces
                </AccordionTrigger>
                <AccordionContent className='flex gap-2 text-sm text-slate-500 px-2'>
                  <Video /> Forces types, components etc
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger className='flex items-center justify-between px-2 bg-slate-200 dark:bg-inherit'>
                  Forces
                </AccordionTrigger>
                <AccordionContent className='flex gap-2 text-sm text-slate-500 px-2'>
                  <Video /> Forces types, components etc
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger className='flex items-center justify-between px-2 bg-slate-200 dark:bg-inherit'>
                  Forces
                </AccordionTrigger>
                <AccordionContent className='flex gap-2 text-sm text-slate-500 px-2'>
                  <Video /> Forces types, components etc
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>
        {/* -------------------------------------------------------Instructor & Related courses-------------------------------------------- */}
        <div className='grid grid-rows-[1fr_1fr]  gap-4'>
          {/* Instructor's card */}
          <Card className='px-4 pt-2 dark:bg-[#1d1e22]'>
            <div className='flex items-center justify-start gap-2'>
              <Button className='bg-white text-black' size='icon'>
                <User className='w-5 h-5' />
              </Button>
              Instructor
            </div>
            <CardHeader>
              <CardTitle>Yebga Ruben</CardTitle>
              <CardDescription>
                9 sections . 41 lectures . 3H47m
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Free</p>
            </CardContent>
          </Card>
          {/* Related courses card */}
          <Card className='p-4 dark:bg-[#1d1e22] '>
            <div className='flex items-center justify-start gap-2'>
              <Button className='bg-white text-black' size='icon'>
                <Badge className='w-5 h-5' />
              </Button>
              Related Courses
            </div>

            <div className='border mt-2 p-1 flex items-center gap-2 text-xs hover:underline cursor-pointer'>
              <Avatar>
                <AvatarImage src='/google.svg' className='object-cover' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h3>Nuclear physics</h3>
            </div>

            <div className='border mt-[1px] flex items-center justify-between text-xs font-bold p-1'>
              see Details
              <Button className='bg-white text-black' size='sm'>
                <ArrowRight className='w-5 h-5' />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Course;
