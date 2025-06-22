import React, { ReactNode } from 'react'
import SideBar from './_component/sideNav'

export default function DashBoardlayout({children}:{children:ReactNode}) {
  return (
   <div className="grid grid-cols-12 min-h-screen w-full">
  <div className="block md:col-span-2 ">

    <SideBar />
  </div>
  <div className="col-span-10">
    {children}
  </div>
</div>

  )
}
