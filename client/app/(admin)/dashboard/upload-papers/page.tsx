"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paper, subjects, year } from "@/app/constant";
import { addPaperAction } from "@/actions/paperAction";
import { paperFormState, StringMap } from "@/types/paper";
import { Input } from "@/components/ui/input";
import SubmitBtn from "../../components/SubmitBtn";

const initialState: paperFormState<StringMap> = {};

export default function Home() {
  const [formState, formAction] = useFormState(addPaperAction, initialState);
  const [url, setUrl] = useState("");
  //const { name, category, url } = formState?.data || {};
  const [showForm, setshowForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.successMsg) {
      toast.success(formState.successMsg);
      formRef?.current?.reset();
      setshowForm(false);
    }
  }, [formState]);

  return (
    <main className='flex min-h-screen flex-col justify-start items-center p-6'>
      <div className='flex w-full items-center justify-between border-b p-3'>
        <h1 className={`text-2xl`}>Upload Papers</h1>
      </div>
      <h1
        className={`mb-4 text-xl md:text-2xl font-black dark:text-white text-neutral-800 animate-bounce`}
      >
        get started ✅
      </h1>
      {!showForm && (
        <UploadDropzone
          endpoint='fileUploader'
          className=' dark:bg-white'
          onClientUploadComplete={res => {
            const url = res[0].url;
            setUrl(url);
            setshowForm(true);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
        />
      )}

      {showForm && (
        <form
          action={formAction}
          className='space-y-0 min-w-96  p-2'
          ref={formRef}
        >
          <div>
            <Label htmlFor='name'>Subject Name</Label>
            <Select name='name'>
              <SelectTrigger>
                <SelectValue placeholder='Select a subject' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>subject</SelectLabel>
                  {subjects.map((s, index) => (
                    <SelectItem key={index} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='min-h-8'>
              {formState?.errors?.name && (
                <p className='text-red-500 text-sm'>
                  {formState?.errors?.name}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor='category'>Category</Label>
            <Select name='category'>
              <SelectTrigger className=''>
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>level</SelectLabel>
                  <SelectItem value='advanced'>Advanced</SelectItem>
                  <SelectItem value='ordinary'>Ordinary</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='min-h-8'>
              {formState?.errors?.category && (
                <p className='text-red-500 text-sm'>
                  {formState?.errors?.category}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor='paper'>Paper</Label>
            <Select name='paper'>
              <SelectTrigger>
                <SelectValue placeholder='Select a paper' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>paper</SelectLabel>
                  {paper.map((s, index) => (
                    <SelectItem key={index} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='min-h-8'>
              {formState?.errors?.paper && (
                <p className='text-red-500 text-sm'>
                  {formState?.errors?.paper}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor='year'>Year</Label>
            <Select name='year'>
              <SelectTrigger>
                <SelectValue placeholder='Select a year' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>yr</SelectLabel>
                  {year.map((s, index) => (
                    <SelectItem key={index} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='min-h-8'>
              {formState?.errors?.year && (
                <p className='text-red-500 text-sm'>
                  {formState?.errors?.year}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor='url'>Link</Label>
            <Input name='url' value={url} readOnly />
            <div className='min-h-8'>
              {formState?.errors?.url && (
                <p className='text-red-500 text-sm'>{formState?.errors?.url}</p>
              )}
            </div>
          </div>

          <SubmitBtn />
        </form>
      )}
    </main>
  );
}
