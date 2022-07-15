import React, { useState, useEffect } from 'react';

const AdminClock = () => {

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  return (
    <>
      <p className='text-banner font-medium m-0 leading-tight'>
        {dateState.toLocaleString('en-US', {
          hour: '2-digit',
          minute: 'numeric',
          hour12: true,
        })}
      </p>
      <p className='text-subbody font-regular m-0'>
        {dateState.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </>
  )
}

export default AdminClock