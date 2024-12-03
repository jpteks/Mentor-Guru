import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Account = () => {
  return (
    <div className='h-screen border-x p-6'>
      <form className='flex flex-col gap-6'>
        <h1 className='font-bold'>Account Settings</h1>
        <div className='grid md:grid-cols-2 w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' placeholder='Name of your project' />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Email</Label>
            <Input id='email' placeholder='Name of your project' />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Phone Number</Label>
            <Input id='name' placeholder='Name of your project' />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Region</Label>
            <Input id='name' placeholder='Name of your project' />
          </div>
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Bio</Label>
          <Textarea placeholder='Type your message here.' />
        </div>

        <div className="flex gap-2">
          <Button>Update</Button>
          <Button variant={"outline"}  >Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default Account;
