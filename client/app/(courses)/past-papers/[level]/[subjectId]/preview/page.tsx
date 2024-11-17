import { Suspense } from "react";
import Preview from "./preview";

const page = () => {
  return (
    <div>
      <Suspense fallback={<PreviewFallback />}>
        <Preview />
      </Suspense>
    </div>
  );
};

export default page;

function PreviewFallback() {
  return <>placeholder</>;
}
