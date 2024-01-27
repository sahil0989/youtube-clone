import React from 'react'

function Spinner() {
  return (
    <div className='flex items-center w-full justify-center py-3'>
        <div className='w-10 h-10 border-2 rounded-full border-red-600 border-solid animate-spin border-t-transparent'></div>
    </div>
  )
}

export default Spinner