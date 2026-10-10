import React from 'react'
import {ClimbingBoxLoader} from "react-spinners";
export default function loading() {
  return (
    <div className='h-screen bg-gray-200 flex justify-center items-center'>
     
<ClimbingBoxLoader color="rgb(37, 150, 52)" />
    </div>
  )
}
