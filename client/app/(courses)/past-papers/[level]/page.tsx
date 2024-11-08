import { advancedSubjects, ordinarySubjects } from "@/app/constant";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default async function page({ params }: { params: { level: string } }) {
  const level = params.level;

  const subjects = level === "advanced" ? advancedSubjects : ordinarySubjects;

  return (
    <div
      className='grow'
      // style={{
      //   backgroundImage: "url('/card.jpg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div className='grid md:grid-cols-3 p-3 lg:grid-cols-4 gap-3 '>
        {subjects.map((subject, idx) => (
          <Link
            key={idx}
            href={`/past-papers/${level}/${subject.toLowerCase()}`}
          >
            <Card className='bg-transparent'>
              <CardHeader>
                <CardTitle className='text-center'> {subject} </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
