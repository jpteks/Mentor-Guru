import React from "react";

export default function loading() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white'></div>
    </div>
  );
}
