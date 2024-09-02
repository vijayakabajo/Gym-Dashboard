import React from 'react'

const ClientModal = (client) => {
  return (
    <div className=" bg-stone-700 bg-opacity-50 px-16 py-3 rounded-lg">
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-white font-serif text-3xl mb-3 font-semibold">My Customers</h1>
      <div className="rounded-full overflow-hidden">
        <img src="/gymmm.gif" alt="gif" className="h-36" />
      </div>
    </div>
    <div className="space-y-1 p-2 font-base mt-2 text-white">

    </div>
  </div>
  )
}

export default ClientModal