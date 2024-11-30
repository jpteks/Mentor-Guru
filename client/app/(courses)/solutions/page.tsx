"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LevelWrapperSkeleton } from "../components/skeletonns";
import { Suspense } from "react";

const SolutionsPage = () => {
  const router = useRouter();
  return (
    <div>
      <Suspense fallback={<LevelWrapperSkeleton />}>
        <div className='max-w-[900px] mx-auto gap-3 grid md:grid-cols-2 py-4 px-3'>
          {[
            {
              title: "Ordinary",
              description: "This is the first past paper",
              image:
                "https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvY0HIWELvZowzOpsYWD1jXQ3evFdluRHbPTtNa",
              link: "solutions/ordinary",
            },
            {
              title: "Advanced",
              description: "This is the second past paper",
              image:
                "https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvY0HIWELvZowzOpsYWD1jXQ3evFdluRHbPTtNa",
              link: "solutions/advanced",
            },
          ].map((card, index) => (
            <Card
              key={index}
              className='max-w-screen-md dark:bg-slate-700 border-2'
            >
              <CardHeader>
                <CardTitle className='text-center text-3xl'>
                  {card.title}{" "}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='rounded-full grid place-items-center gap-2 '>
                  <Image
                    className='w-10/12 object-cover rounded-full border'
                    src={card.image}
                    alt='resource'
                    width={300}
                    height={400}
                  />
                  <Button
                    onClick={() => router.push(card.link)}
                    className='w-full bg-blue-600 text-white hover:bg-blue-600'
                  >
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default SolutionsPage;
