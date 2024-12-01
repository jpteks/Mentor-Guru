import { Suspense } from "react";
import ResetPassword from "./rp-form";

const page = () => {
  return (
    <div>
      <Suspense fallback={<RPFallback />}>
        <ResetPassword />
      </Suspense>
    </div>
  );
};

export default page;

function RPFallback() {
  return <>placeholder</>;
}
