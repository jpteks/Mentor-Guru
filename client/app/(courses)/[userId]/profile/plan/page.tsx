import { backend_url } from "@/app/constant";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { usersType } from "@/types/user";
import { cookies } from "next/headers";

async function getData(userId: string): Promise<usersType> {
  const cookieStore = cookies();
  const token = cookieStore.get("refreshToken")?.value;
  try {
    const res = await fetch(`${backend_url}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("Failed to fetch data [/profile]", await res.text());
      return {
        _id: "",
        email: "",
        password: "",
        phoneNumber: "",
        plan: {
          packageName: "",
        },
        region: "",
        role: "",
        subscription: "",
        username: "",
        bio: "",
        avatarUrl: "",
      };
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return {
      _id: "",
      email: "",
      password: "",
      phoneNumber: "",
      plan: {
        packageName: "",
      },
      region: "",
      role: "",
      subscription: "",
      username: "",
      bio: "",
      avatarUrl: "",
    };
  }
}

const Plan = async ({ params }: { params: { userId: string } }) => {
  // get random number from o to 2
  const userId = params.userId;
  const data: usersType = await getData(userId);

  const currentPlan = data.plan?.packageName;
  return (
    <div className='h-screen border-x p-6'>
      <h1 className='font-bold mb-7'>Subscription Plan</h1>

      <div className='max-w-md flex flex-col gap-3'>
        <Card className='dark:bg-transparent'>
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
        {currentPlan === "Free" && (
          <>
            {/* Basic Upgrade Card */}
            <Card className='dark:bg-transparent'>
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
            <Card className='dark:bg-transparent'>
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

        {currentPlan === "Basic" && (
          <Card className='dark:bg-transparent'>
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

        {currentPlan === "Premium" && (
          <p className='text-sm text-gray-500'>
            You are on the Premium plan. Enjoy all the features!
          </p>
        )}
      </div>
    </div>
  );
};

export default Plan;
