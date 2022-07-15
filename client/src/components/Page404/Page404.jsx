import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setMessage('Internal server error')
    }, 7000)
  })

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {
        message ?
        <h1 className="text-xl font-semibold">
          { message }. <Link to="/" className='text-blue-500 hover:text-blue-500'>Go back home.</Link>
        </h1>
        :
        <h1 className="text-xl font-semibold animate-bounce">
          Loading...
        </h1>
      }
    </div>
  )
}

export default Page404
