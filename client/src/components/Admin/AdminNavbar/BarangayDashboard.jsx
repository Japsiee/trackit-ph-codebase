import React from 'react'
import { Link } from 'react-router-dom'

import {HomeOutlined} from '@ant-design/icons'

const BarangayDashboard = () =>{
  
    return(
        <>
            {/*Barangay Dashboard*/}
            <Link to="/" className='font-medium flex items-center text-subbody'>
                <HomeOutlined />
                <span className='ml-3'>
                    Dashboard 
                </span>
            </Link>
        </>
    )
}

export default BarangayDashboard