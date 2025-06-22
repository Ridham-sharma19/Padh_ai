"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import React, { ReactNode } from "react";

export default function UploadPdf({ children }: { children: ReactNode }) {
  return (
    <div>
      <Dialog>
       
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Your Pdf</DialogTitle>
            <div className="text-muted-foreground text-sm">
              <div className="pt-2">
                <h2 className="text-xl font-semibold mb-2">Select a file to Upload</h2>
                <div className="mt-2 p-3 rounded-md border flex items-center justify-between">
                  <input type="file" accept="appliaction/pdf"/>
                </div>
                <div className="mt-4">
                  <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Name</label>
                  <Input id="fileName" placeholder="File Name" />
                </div>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className="sm:justify-end mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
