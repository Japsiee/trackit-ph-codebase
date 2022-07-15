import React from 'react'
import { Link } from 'react-router-dom'

import {HighlightOutlined} from '@ant-design/icons'

const Announcements = () =>{
    return(
        <>
            {/*Barangay Announcements*/}
            <Link to="/announcements" className='font-medium flex items-center text-subbody'>
                <HighlightOutlined />
                <span className='ml-3'>
                    Announcements
                </span>
            </Link>
            
        </>
    )
}

export default Announcements