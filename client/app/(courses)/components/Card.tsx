import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CardCourse = () => {
  return (
    <Card className=''>
      <Link
        href='/courses/qxnlpr_dewz6èndrtmn'
        className='block rounded-lg p-4 shadow-sm shadow-indigo-100'
      >
        <Image
          alt='ok'
          width={300}
          height={400}
          src='/card.jpg'
          className='h-56 w-full rounded-md object-cover'
        />

        <div className='mt-2'>
          <div className='flex justify-between font-bold'>
            <h3 className=''>Further Mathematics</h3>
            <p>AL</p>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CardCourse;
