import { backend_url } from "@/app/constant";
import { pricingType } from "@/types/pricing";
import clsx from "clsx";
import { Check } from "lucide-react";

async function getData(): Promise<pricingType[]> {
  try {
    const res = await fetch(`${backend_url}/plans`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("Failed to fetch data [/plans]", await res.text());
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return [];
  }
}

const Pricing = async () => {
  const data: pricingType[] = await getData();

  return (
    <div className='mx-auto max-w-5xl px-4 py-8 sm:px-1 sm:py-12 lg:px-1'>
      <h1 className='text-center mb-7  text-muted-foreground mx-auto text-xl font-semibold '>
        Our Plans
      </h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 sm:items-center md:gap-8'>
        {data.map(plan => (
          <div
            key={plan._id}
            className={clsx(
              "rounded-2xl border p-6 shadow-sm sm:px-8 lg:p-12",
              {
                "border-blue-600 ring-1 ring-blue-600":
                  plan.packageName === "Premium",
              }
            )}
          >
            <div className='text-center'>
              <h2 className='text-lg font-medium text-gray-900 dark:text-white'>
                {plan.packageName}
                <span className='sr-only'> Plan</span>
              </h2>

              <p className='mt-2 sm:mt-4'>
                <strong className='text-xl font-bold text-gray-900 dark:text-white sm:text-3xl'>
                  {(() => {
                    switch (plan.packageName) {
                      case "Premium":
                        return "50,000";
                      case "Basic":
                        return "20,000";
                      default:
                        return "0";
                    }
                  })()}{" "}
                  FCFA
                </strong>
                <span className='text-sm font-medium text-gray-700 dark:text-white'>
                  /year
                </span>
              </p>
            </div>

            <ul className='mt-6 space-y-2'>
              <span>Access to : </span>
              {plan.accessToAllCourses && (
                <li className='flex items-center gap-1'>
                  <Check className='text-blue-600 h-4 w-4' />
                  <span className='text-gray-700 dark:text-gray-300'>
                    All courses
                  </span>
                </li>
              )}
              {plan.accessToPastPapers && (
                <li className='flex items-center gap-1'>
                  <Check className='text-blue-600 h-4 w-4' />
                  <span className='text-gray-700 dark:text-gray-300'>
                    Past papers
                  </span>
                </li>
              )}
              {plan.accessToPdfSolutions && (
                <li className='flex items-center gap-1'>
                  <Check className='text-blue-600 h-4 w-4' />
                  <span className='text-gray-700 dark:text-gray-300'>
                    PDF solutions
                  </span>
                </li>
              )}
              {plan.accessToRestrictedVideos && (
                <li className='flex items-center gap-1'>
                  <Check className='text-blue-600 h-4 w-4' />
                  <span className='text-gray-700 dark:text-gray-300'>
                    Restricted videos
                  </span>
                </li>
              )}
              {plan.accessToVideoSolutions && (
                <li className='flex items-center gap-1'>
                  <Check className='text-blue-600 h-4 w-4' />
                  <span className='text-gray-700 dark:text-gray-300'>
                    Video solutions
                  </span>
                </li>
              )}
              {plan.downloadableAnswers && (
                <li className='flex items-center gap-1'>
                  <Check className='text-blue-600 h-4 w-4' />
                  <span className='text-gray-700 dark:text-gray-300'>
                    Downloadable answers
                  </span>
                </li>
              )}
              {plan.downloadablePapers && (
                <li className='flex items-center gap-1'>
                  <Check className='text-blue-600 h-4 w-4' />
                  <span className='text-gray-700 dark:text-gray-300'>
                    Downloadable papers
                  </span>
                </li>
              )}
              {plan.downloadableVideos && (
                <li className='flex items-center gap-1'>
                  <Check className='text-blue-600 h-4 w-4' />
                  <span className='text-gray-700 dark:text-gray-300'>
                    Downloadable videos
                  </span>
                </li>
              )}
            </ul>

            <a
              href='#'
              className='mt-8 block rounded-full border border-blue-600 bg-white dark:bg-transparent px-12 py-3 text-center text-sm font-medium text-blue-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500'
              aria-label={`Get started with the ${plan.packageName} plan`}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
