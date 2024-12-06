import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usersType } from "@/types/user";

const AccountForm = ({ data }: { data: usersType }) => {
  return (
    <div className='h-screen border-x p-6'>
      <form className='flex flex-col gap-6'>
        <h1 className='font-bold'>Account Settings</h1>
        <div className='grid md:grid-cols-2 w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' className='' defaultValue={data.username} />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Email</Label>
            <Input
              id='email'
              className=' border-none'
              defaultValue={data.email}
              readOnly
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Phone Number</Label>
            <Input id='name' className='' defaultValue={data.phoneNumber} />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Region</Label>
            <Input
              id='name'
              className=' border-none'
              defaultValue={data.region}
              readOnly
            />
          </div>
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Bio</Label>
          <Textarea placeholder='Tell us about you.' defaultValue={data.bio} />
        </div>

        <div className='flex gap-2'>
          <Button>Update</Button>
          <Button variant={"outline"}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
