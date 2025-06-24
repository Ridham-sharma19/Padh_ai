"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";

import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import React, { ReactNode, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { generateUploadUrl } from "@/convex/fileStorage";
import { useUser } from "@clerk/nextjs";
import axios from 'axios'

export default function UploadPdf({ children }: { children: ReactNode }) {
  const generatUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const {user}=useUser();
  const [open,setOpen]=useState(false);
  const AddFileEntery=useMutation(api.fileStorage.AddfileEntryToDb);
  const getFileUrl=useMutation(api.fileStorage.getfileUrl);

  const embedDocument=useAction(api.myAction.ingest)

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName,setFileName]=useState("")

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onUpload=async()=>{
    setLoading(true);
     const postUrl = await generatUploadUrl();
    
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file!.type },
      body:file,
    });
    const { storageId } = await result.json();
    const fileUrl=await getFileUrl({ storageId });
   
   const fileId = uuidv4(); 

   if (!fileId || !fileUrl || !user?.primaryEmailAddress?.emailAddress) {
  console.error("Missing required data. File not saved.");
  return;
}

const resp = await AddFileEntery({
  fileId:fileId,
  storageId:storageId,
  fileName: fileName ?? "Untitled file",
  fileUrl:fileUrl,
  createdBy: user.primaryEmailAddress.emailAddress
});

const Apiresp=await axios.get("/api/pdf-loader?pdfUrl="+fileUrl);

try {
  const embedresult = await embedDocument({
    splitText: Apiresp.data.result,
    fileId:fileId
  });

  console.log(fileId);
  console.log(embedresult);
} catch (error) {
  console.error("Error during document embedding:", error);
}


// console.log(resp);
    setLoading(false);
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger asChild><Button className="w-full text-lg" onClick={()=>setOpen(true)}>Upload Pdf File +</Button></DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Your Pdf</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm pt-2">
              Select a file to upload and provide a name.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <h2 className="text-xl font-semibold mb-2">Select a file to Upload</h2>
            <div className="mt-2 p-3 rounded-md border flex items-center justify-between">
              <input
              className="text-slate-400 cursor-pointer"
                type="file"
                accept="application/pdf"
                onChange={onFileSelect}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="fileName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                File Name
              </label>
              <Input id="fileName" placeholder="File Name" onChange={(e)=>setFileName(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="sm:justify-end mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={()=>setOpen(false)}>
                Close
              </Button>
            </DialogClose>
            <Button
            onClick={onUpload} disabled={loading}>{
              loading?<Loader2Icon className="animate-spin"/>:"Upload"
            }              
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
function uuid4() {
  throw new Error("Function not implemented.");
}
