import React from 'react'
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';

import {FlagOutlined, CaretDownOutlined, FireOutlined, IssuesCloseOutlined} from '@ant-design/icons'

const ResidentReport = () =>{
  
  const settings = (
      <Menu style={{ padding: 0 }}>
        <Menu.Item className='hover:text-blue-500' style={{ margin: 0 , padding:"10px 15px"}} key="1">
            <Link 
                to="/incident-report"
            >
                <div className='flex justify-start items-center hover:text-blue-500'>
                  <FireOutlined />
                  <span className="ml-3 text-caption">
                    Incident Report
                  </span>
                </div>
            </Link>
        </Menu.Item>
        <Menu.Item className='hover:text-blue-500' style={{ margin: 0 , padding:"10px 15px"}} key="2">
            <Link 
                to="/complaint-report"
            >
                <div className='flex justify-start items-center hover:text-blue-500'>
                  <IssuesCloseOutlined />
                  <span className="ml-3 text-caption">
                    Complaint Report
                  </span>
                </div> 
            </Link>
        </Menu.Item>
      </Menu>
    );
    return(
        <>
            {/*Settings Drop Down*/}
            <Dropdown 
              overlay={settings} 
              placement='bottomCenter' 
              className='flex justify-center items-center text-white'
              trigger={['click']} 
            >
              <Link 
                to=""
                className='text-gray-700 text-subbody font-medium'
                onClick={ e => e.preventDefault() }
              >
                <FlagOutlined />
                <span className="px-3">
                  Reports
                </span>
                <CaretDownOutlined />
              </Link>
            </Dropdown>
        </>
    )
}

export default ResidentReport