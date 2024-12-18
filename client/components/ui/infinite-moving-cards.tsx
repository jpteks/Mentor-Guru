"use client";

import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const getDirection = () => {
      if (containerRef.current) {
        if (direction === "left") {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "forwards"
          );
        } else {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "reverse"
          );
        }
      }
    };
    const getSpeed = () => {
      if (containerRef.current) {
        if (speed === "fast") {
          containerRef.current.style.setProperty("--animation-duration", "20s");
        } else if (speed === "normal") {
          containerRef.current.style.setProperty("--animation-duration", "40s");
        } else {
          containerRef.current.style.setProperty("--animation-duration", "80s");
        }
      }
    };
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        scrollerContent.forEach(item => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    }
    addAnimation();
  }, [direction, speed]);

  return (
    <>
      <h1 className='text-3xl md:text-4xl font-bold'>
        Our Successful <span className='text-orange-500'>Stories</span>
      </h1>
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20  max-w-7xl overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap ",
            start && "animate-scroll ",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map(item => (
            <li
              className='w-[350px]  max-w-full bg-white relative rounded-2xl  border-[2px] flex-shrink-0 px-8 py-6 md:w-[450px]'
              style={{
                background: "white",
                // "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
              }}
              key={item.name}
            >
              <blockquote>
                <div
                  aria-hidden='true'
                  className='user-select-none -z-1 pointer-events-none absolute   -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]'
                ></div>

                <span className=' relative z-20 text-sm leading-[1.6] text-black font-normal'>
                  <Quote /> {item.quote} <Quote className="ml-auto" />
                </span>
                <div className='relative z-20 mt-6 flex flex-row items-center'>
                  <span className='flex flex-col gap-1'>
                    <span className=' text-sm leading-[1.6] text-gray-900 font-normal'>
                      {item.name}
                    </span>
                    <span className=' text-sm leading-[1.6] text-gray-900 font-bold'>
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
