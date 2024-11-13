"use client";
import { Button } from "@/components/ui/button";
import extractIdFromUrl from "@/lib/extractId";
import { usePathname, useRouter } from "next/navigation";

const PreviewBtn = ({ url }: { url: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const id = extractIdFromUrl(url);
  const handlePreview = () => {
    router.push(`${pathname}/preview?url=${id}`);
  };

  return (
    <Button
      variant={"outline"}
      onClick={handlePreview}
      className='dark:bg-transparent'
    >
      preview
    </Button>
  );
};

export default PreviewBtn;
