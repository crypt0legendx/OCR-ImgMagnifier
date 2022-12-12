import React from 'react'
import Spinner from 'react-spinners/MoonLoader'

function Loader(){
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen flex justify-center items-center bg-black/50">
      <Spinner size={60} color="#202020" />
    </div>
  )
}

export default Loader
