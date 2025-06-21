import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { ReactNode } from 'react'



export default function Provider({children}:{children:ReactNode}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return (
   <ConvexProvider client={convex}>{children}</ConvexProvider>
  )
}
