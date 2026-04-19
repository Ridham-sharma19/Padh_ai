"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

import Hero from "./workspace/_component/hero"; 

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    const checkUser = async () => {
      if (!user?.primaryEmailAddress?.emailAddress || !user?.fullName) {
        console.warn(
          "User data incomplete for creation, skipping create user mutation."
        );
        return;
      }

      try {
        const result = await createUser({
          email: user.primaryEmailAddress.emailAddress,
          username: user.fullName,
        });
        console.log("User creation/check result:", result);
      } catch (error) {
        console.error("Error creating/checking user in Convex:", error);
      }
    };

    if (isLoaded && isSignedIn) {
      checkUser();
    }
  }, [isLoaded, isSignedIn, user, createUser]);

  const AuthButton = () => {
    if (!isLoaded) {
      return <Button>Get Started</Button>;
    }

    if (user && isSignedIn) {
      return (
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      );
    }

    return (
      <Link href="/sign-up">
        <Button>Get Started</Button>
      </Link>
    );
  };

  return <Hero authButton={<AuthButton />} />;
}