import { getPaperAction } from "@/actions/paperAction";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { Download } from "lucide-react";

const Table = async ({
  name,
  level,
  currentPage,
}: {
  level: string;
  name: string;
  currentPage: number;
}) => {
  const { papers, totalPages } = await getPaperAction(currentPage, name, level);

  return (
    <div className='rounded-lg border border-gray-200'>
      <div className='overflow-x-auto rounded-t-lg'>
        <table className='min-w-full divide-y-2 divide-gray-200 bg-white dark:bg-inherit  text-sm'>
          <thead className='rounded-lg text-left text-sm font-normal'>
            <tr>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-left'>
                Paper
              </th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-left'>
                Published Date
              </th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-left'>
                Action
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {papers && papers?.length > 0 ? (
              papers.map((subj, idx) => (
                <tr key={idx}>
                  <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white'>
                    {subj.name}-{subj.year}-{subj.paper}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-500'>
                    {subj.createdAt.toLocaleDateString("en-US", {
                      weekday: "long", // 'short' for abbreviated day
                      year: "numeric",
                      month: "long", // 'short' for abbreviated month
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZoneName: "short", // Include time zone
                    })}
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray- flex items-center gap-2'>
                    <Button variant={"outline"} className='dark:bg-transparent'>
                      preview
                    </Button>
                    <Button className='dark:bg-transparent' variant={"outline"}>
                      <Download size={22} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <div className="text-2xl font-medium text-center p-3">No paper yet</div>
            )}
          </tbody>
        </table>
      </div>

      <div className='rounded-b-lg border-t border-gray-200 px-4 py-2'>
        <div className='mt-5 flex w-full justify-center'>
          <Pagination totalPages={totalPages as number} />
        </div>
      </div>
    </div>
  );
};

export default Table;
