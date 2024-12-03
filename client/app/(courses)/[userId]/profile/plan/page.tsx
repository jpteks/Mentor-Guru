import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Plan = () => {
  const currentPlan: "free" | "basic" | "premium" = "free";
  return (
    <div className='h-screen border-x p-6'>
      <h1 className='font-bold mb-7'>Subscription Plan</h1>

      <div className='max-w-md flex flex-col gap-3'>
        {/* Current Plan Card */}
        <Card className="dark:bg-transparent">
          <CardHeader>
            <CardTitle className='text-sm capitalize'>
              {currentPlan} Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>Current plan</Badge>
          </CardContent>
        </Card>

        {/* Show upgrade options based on current plan */}
        {currentPlan === "free" && (
          <>
            {/* Basic Upgrade Card */}
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle className='text-sm'>Basic Plan</CardTitle>
                <CardDescription className='text-xs'>
                  Upgrade to the Basic plan and unlock more features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant='destructive' className='w-full text-xs'>
                  Upgrade to Basic
                </Button>
              </CardContent>
            </Card>

            {/* Premium Upgrade Card */}
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle className='text-sm'>Premium Plan</CardTitle>
                <CardDescription className='text-xs'>
                  Unlock all features and get unlimited access to our Premium
                  content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant='destructive' className='w-full text-xs'>
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {currentPlan === "basic" && (
          <Card className="dark:bg-transparent">
            <CardHeader>
              <CardTitle className='text-sm'>Premium Plan</CardTitle>
              <CardDescription className='text-xs'>
                Unlock all features and get unlimited access to our Premium
                content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant='destructive' className='w-full text-xs'>
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        )}

        {currentPlan === "premium" && (
          <p className='text-sm text-gray-500'>
            You are on the Premium plan. Enjoy all the features!
          </p>
        )}
      </div>
    </div>
  );
};

export default Plan;
