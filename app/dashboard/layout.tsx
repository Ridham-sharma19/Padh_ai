import React, { ReactNode } from 'react'
import SideBar from './_component/sideNav'
import Header from './_component/headerw'



export default function DashBoardlayout({children}:{children:ReactNode}) {
  return (
   <div className="grid grid-cols-16 min-h-screen w-full">
  <div className="block md:col-span-2 ">

    <SideBar />
  </div>
  <div className="col-span-14">

  <Header></Header>
    <div>
        {children}
    </div>
    
  </div>
</div>

  )
}
