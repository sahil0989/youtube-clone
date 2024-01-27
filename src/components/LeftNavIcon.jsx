import React from 'react'

function LeftNavIcon({action, className, icon, name}) {
  return (
    <div className={`px-4 text-md hover:text-white flex items-center gap-4 my-2 text-white/[0.80] hover:bg-white/[0.15] cursor-pointer mx-3 py-1 rounded-lg transition-all `+className} onClick={action}>
        <span className='text-xl'>{icon}</span>
        {name}
    </div>
  )
}

export default LeftNavIcon