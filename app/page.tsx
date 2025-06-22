"use client"
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { log } from "console";

export default function Home() {
  const {user}=useUser();

useEffect(() => {
  if (user) {
    checkUser(); 
  }
}, [user]);



  const createUser=useMutation(api.user.createUser)
  const checkUser=async()=>{
    const result=await createUser({
      email:user?.primaryEmailAddress?.emailAddress!,
      username:user?.fullName!

    })
    console.log(result)
  }
  return (
    <div>
      hello ji
     <Button>hello</Button>
     <UserButton></UserButton>
    </div>
  );
}
