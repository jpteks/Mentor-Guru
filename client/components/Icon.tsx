import { Eye, EyeOff } from "lucide-react";
import React from "react";

type Props = {
  handle: () => void;
  value: boolean;
};

const Icon = ({ handle, value }: Props) => {
  return value ? (
    <Eye
      color='#155FA0'
      absoluteStrokeWidth
      strokeWidth={1.5}
      size={16}
      className='cursor-pointer active:scale-95'
      onClick={handle}
    />
  ) : (
    <EyeOff
      color='#155FA0'
      absoluteStrokeWidth
      strokeWidth={1.5}
      size={17}
      className='cursor-pointer active:scale-95'
      onClick={handle}
    />
  );
};

export default Icon;
