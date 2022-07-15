import React from 'react'
import { Link } from 'react-router-dom'

import {FileOutlined} from '@ant-design/icons'

const IssuanceDocuments = () =>{
  
    return(
        <>
            <Link to="/document-issuance" className='font-medium flex items-center text-subbody'>
                <FileOutlined />
                <span className='ml-3'>
                    Documents
                </span>
            </Link>
        </>
    )
}

export default IssuanceDocuments