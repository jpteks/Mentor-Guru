import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function page() {
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
        {[
          {
            title: "Acounting",
          },
          {
            title: "Mathematics",
          },
          {
            title: "English",
          },
          {
            title: "Physics",
          },
          {
            title: "Chemistry",
          },
          {
            title: "Biology",
          },
          {
            title: "History",
          },
          {
            title: "Geography",
          },
          {
            title: "Economics",
          },
          {
            title: "Political Science",
          },
          {
            title: "Psychology",
          },
          {
            title: "Sociology",
          },
          {
            title: "Environmental Science",
          },
        ].map((course, idx) => (
          <Link
            key={idx}
            href={`/past-papers/advanced/${course.title.toLowerCase()}`}
          >
            <Card className=''>
              <CardHeader>
                <CardTitle className='text-center'> {course.title} </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
