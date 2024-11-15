import { CheckIcon, ClockIcon } from "lucide-react";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

export default function PlanStatus({ status }: { status: string }) {
  // return (
  //   <span
  //     className={clsx(
  //       "inline-flex items-center rounded-full px-2 py-1 text-xs",
  //       {
  //         "bg-gray-100 text-gray-500": status === "Free",
  //         "bg-slate-500 text-white": status === "Basic",
  //         "bg-yellow-500 text-white": status === "Premium",
  //       }
  //     )}
  //   >
  //     {status === "Free" ? (
  //       <>
  //         Free
  //         <ClockIcon className='ml-1 w-4 text-gray-500' />
  //       </>
  //     ) : null}
  //     {status === "Basic" ? (
  //       <>
  //         Basic
  //         <CheckIcon className='ml-1 w-4 text-white' />
  //       </>
  //     ) : null}
  //     {status === "Premium" ? (
  //       <>
  //         Premium
  //         <CheckIcon className='ml-1 w-4 text-white' />
  //       </>
  //     ) : null}
  //   </span>
  // );

 return <Badge>{status} </Badge>;
}
