"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  const { user } = useUser();

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  return (
    <div className="px-8">
      <h2 className="font-medium text-4xl">Workspace</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {fileList === undefined ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-amber-100 rounded-md h-[150px] animate-pulse"
            ></div>
          ))
        ) : fileList === null || fileList.length === 0 ? (
          <div className="col-span-full text-center text-2xl text-black-500 text-slate-200  font-medium">
            Start uploading your files 
          </div>
        ) : (
          fileList.map((file) => (
            <Link key={file.fileId} href={'/workspace/' + file.fileId}>
              <div
                className="flex flex-col items-center text-center cursor-pointer hover:scale-105 hover:bg-amber-100 transition-all p-5 shadow-md rounded-md border"
              >
                <Image src="/pdf.png" alt="file" width={50} height={50} />
                <h2 className="mt-2 font-semibold">{file.fileName}</h2>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
