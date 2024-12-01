"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardDescription } from "./card-hover-effect";

const UpgradeCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sm'>Upgrade to Premium</CardTitle>
        <CardDescription className="text-xs">
          Unlock all features and get unlimited access to our support team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className='w-full text-xs'>upgrade</Button>
      </CardContent>
    </Card>
  );
};

export default UpgradeCard;
