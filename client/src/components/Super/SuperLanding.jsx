import React from 'react'
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import SuperAdminNavbar from "./SuperAdminNavbar"

import { getAuth, signOut } from "firebase/auth";

const SuperLanding = ({ display }) => {
  const auth = getAuth();
  const {userDispatch } = useContext(UserContext);

  const handleLogout = () => {
    signOut(auth).then(() => {
      userDispatch({ type: 'LOGOUT' }) 
      window.location.href="/"
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <>  
    <div className="hidden lg:block">
      <div className='flex justify-start'>
          <div className='h-full'>
            <SuperAdminNavbar />
          </div> 
            <div className="w-full">
                <div className='flex justify-end px-10 my-5'>
                  <p className="hover:cursor-pointer hover:text-blue-900" onClick={ handleLogout } >Logout</p>
                </div>
                <hr className='text-gray text-2xl'/>
                <div>
                  { display }
                </div>
            </div>
      </div>
    </div>
    <div className="flex justify-center items-center lg:hidden h-screen">
        <h1 className="font-semibold text-2"> Cannot access through mobile phone</h1>
    </div> 
    </>
  )
}

export default SuperLanding