import { Button } from "@/components/ui/button";
import { Menu as Icon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='rounded-full' size='sm'>
          <Icon />
        </Button>
      </SheetTrigger>
      <SheetContent className='w-3/4'>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <SheetClose asChild>
            <Link href='/' className='text-center py-2 text-2xl font-black'>
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href='/' className='text-center py-2 text-2xl font-black'>
              Contact us
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href='/courses'
              className='text-center py-2 text-2xl font-black'
            >
              Browse Course
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href='/past-papers'
              className='text-center py-2 text-2xl font-black'
            >
              Past paper
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href='/solutions'
              className='text-center py-2 text-2xl font-black'
            >
              Solutions
            </Link>
          </SheetClose>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>login</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
