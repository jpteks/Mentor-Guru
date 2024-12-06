"use client";
import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { Camera, X } from "lucide-react";
import Image from "next/image";

const UserProfile = ({ avatarUrl }: { avatarUrl: string }) => {
  const [image, setImage] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const avatarEditorRef = useRef<AvatarEditor | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(avatarUrl);
  const [isEditing, setIsEditing] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setImage(acceptedFiles[0]);
      setIsEditing(true); // Start editing when a new file is uploaded
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(previewImage); // Reset to default avatar
    setIsEditing(false);
  };

  const handleSave = () => {
    if (avatarEditorRef.current) {
      const canvas = avatarEditorRef.current.getImageScaledToCanvas();
      const newImage = canvas.toDataURL(); // Get the edited image as a data URL
      setPreviewImage(newImage); // Update the preview with the new image
      setIsEditing(false); // Exit editing mode
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className='flex flex-col items-center  justify-center space-y-6'>
      {/* Upload Zone with Default Avatar */}
      {!isEditing && (
        <div
          {...getRootProps({
            className:
              "relative w-44 h-44 border-2 border-solid border-gray-300 bg-red-300  rounded-full flex items-center justify-center cursor-pointer",
          })}
        >
          <input {...getInputProps()} />
          <Image
            src={`${previewImage}`}
            alt='User Avatar'
            width={100}
            height={100}
            className='w-full h-full object-cover object-center rounded-full'
          />
          <div className='absolute inset-0 flex items-center justify-center opacity-100 hover:opacity-100 bg-black bg-opacity-50 rounded-full transition-opacity'>
            <Camera className='w-10 h-10 text-white' />
          </div>
          <Camera className='w-10 h-10 block md:hidden absolute bottom-0 right-4' />
        </div>
      )}

      {/* Avatar Editor */}
      {image && isEditing && (
        <div className='relative w-48 rounded-full'>
          <AvatarEditor
            ref={avatarEditorRef}
            image={image}
            width={200}
            height={200}
            border={0}
            borderRadius={100}
            scale={scale}
            className='rounded-full'
          />

          {/* Remove Icon */}
          <button
            onClick={handleRemoveImage}
            className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 focus:outline-none'
          >
            <X className='w-5 h-5' />
          </button>

          {/* Scale Slider */}
          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>
              resize:
            </label>
            <input
              type='range'
              min='1'
              max='2'
              step='0.01'
              value={scale}
              onChange={e => setScale(parseFloat(e.target.value))}
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
