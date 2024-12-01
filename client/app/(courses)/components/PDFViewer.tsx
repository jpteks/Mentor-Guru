"use client";

import { Document, Page, pdfjs } from "react-pdf";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    const updatePageWidth = () => {
      const containerWidth =
        document.getElementById("pdf-container")?.clientWidth ||
        window.innerWidth;
      setPageWidth(containerWidth * 0.95);
    };

    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onPageLoadSuccess() {
    setLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <Nav
        previousPage={previousPage}
        nextPage={nextPage}
        pageNumber={pageNumber}
        numPages={numPages}
      />
      <div
        hidden={loading}
        id='pdf-container'
        style={{ height: "calc(100vh - 64px)" }}
        className='flex flex-col items-start justify-start'
      >
        <div className='h-full flex justify-center  w-full max-w-4xl'>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            renderMode='canvas'
            className='w-full'
            loading={
              <div className='flex items-center justify-center h-full'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white'></div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadSuccess={onPageLoadSuccess}
              width={Math.max(pageWidth, 300)} // Minimum width of 390px
            />
          </Document>
        </div>
      </div>
    </>
  );
};

export default PDFViewer;

function Nav({
  pageNumber,
  numPages,
  previousPage,
  nextPage,
}: {
  pageNumber: number;
  numPages: number;
  previousPage: () => void;
  nextPage: () => void;
}) {
  return (
    <nav className='bg-black md:w-3/4 mx-auto'>
      <div className='w-full bg-blue-500 px-2'>
        <div className='w-full flex h-16 items-center justify-between'>
          <div className='flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex flex-shrink-0 items-center'>
              <p className='md:text-2xl font-bold tracking-tighter text-white'>
                Mentor Guru
              </p>
            </div>
          </div>
          <div>
            <Button
              type='button'
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className='px-2 text-gray-400 bg-white dark:hover:text-gray-900 focus:z-20 mr-2'
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-10 w-10' aria-hidden='true' />
            </Button>
            <Button
              type='button'
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className='px-2 text-gray-400 bg-white dark:hover:text-gray-900 focus:z-20'
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-10 w-10' aria-hidden='true' />
            </Button>
          </div>
          <div className=' inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <div className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'>
              <span>{pageNumber}</span>
              <span className='text-gray-400'> / {numPages}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
