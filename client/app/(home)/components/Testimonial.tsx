"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function Testimonial() {
  return (
    <div className='h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-inherit dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
      <InfiniteMovingCards
        items={testimonials}
        direction='right'
        speed='slow'
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Victor Kamnga Jean",
    title: "Student",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "Ngo njock henriette",
    title: "Student",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Alioum Moustapha",
    title: "Student",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Peter Ekome junior",
    title: "Student",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Bayang Cedrick",
    title: "Student",
  },
];
