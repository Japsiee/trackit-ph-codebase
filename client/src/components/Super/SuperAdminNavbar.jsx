import React from 'react'
import {Link} from 'react-router-dom'
import {MonitorOutlined, TeamOutlined} from '@ant-design/icons'
import TrackitLogo from "../../assets/images/logos/trackitph500.png"

const SuperAdminNavbar = () => {
  return (
   <> 

          <div style={{
                width: "300px"
              }}>
              <div className="bg-blue-500 fixed top-0 left-0"
                  style={{
                    padding: "20px",
                    minHeight: "100%",
                    width: "300px"
                  }}>
                <Link to="/" >
                  <p className="flex justify-center text-white text-2xl font-semibold pb-7 hover:cursor-pointer " 
                    style={{
                      paddingTop:"5px"
                    }}>
                      TRACK IT </p>
                </Link>
                <div className="flex justify-center"> 
                  <img 
                      src={ TrackitLogo } 
                      alt="trackit-ph" 
                      className="TrackITLogo hover:cursor-pointer rounded-full bg-white p-2"
                      style={{width: "100px", height: "100px"}}
                  /> 
                </div>
                <p className="flex justify-center text-white font-medium" 
                  style={{
                    paddingTop:"20px"
                  }}> 
                Barangay Cupang West </p>
                <p className="flex justify-center text-white font-medium pt-2" 
                  style={{
                    paddingBottom:"40px"
                  }}> 
                Super Admin </p>
                <Link to="/monitor-admin" >
                  <div className="flex justify-center text-white hover:text-blue-900 hover:cursor-pointer">
                      <MonitorOutlined className="text-3xl"/>
                      <p className='text-lg pt-2 px-3'>Monitor Admin </p>
                  </div>
                </Link>
                <hr className='text-white my-5'/>
                <Link to="/monitor-user" >
                  <div className="flex justify-center text-white hover:text-blue-900 hover:cursor-pointer">
                      <TeamOutlined className="text-3xl"/>
                      <p className='text-lg pt-2 px-3'>Monitor User </p>
                  </div>
                </Link>

              </div>
      </div>
   </>
  )
}

export default SuperAdminNavbar