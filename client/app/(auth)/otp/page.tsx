import { Suspense } from "react";
import Otp from "./otp-form";

const page = () => {
  return ( 
    <div>
      <Suspense fallback={<OtpFallback />} >
        <Otp />
      </Suspense>
    </div>
   );
}
 
export default page;


function OtpFallback() {
  return <>placeholder</>;
}