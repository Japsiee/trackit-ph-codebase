import React from 'react'
import { Menu, Dropdown } from 'antd';
import {Link} from 'react-router-dom'

import {UserOutlined, CaretDownOutlined, UsergroupAddOutlined} from '@ant-design/icons'


const BarangayResident = () =>{
  
  const settings = (
    <Menu style={{ padding: 0 }}>
      <Menu.Item className='hover:text-blue-500' style={{ margin: 0 , padding:"10px 15px"}} key="1">
          <Link 
              to="/resident-request"
          >
              <div className='flex justify-start text-subbody items-center hover:text-blue-500'>
                  <UsergroupAddOutlined />
                  <span className="ml-3 text-caption">
                    Resident's Request
                  </span>
              </div>
          </Link>
      </Menu.Item>
      <Menu.Item className='hover:text-blue-500 ' style={{ margin: 0 , padding:"10px 15px"}} key="2">
          <Link 
              to="/resident-profile"
          >
              <div className='flex justify-start items-center text-subbody hover:text-blue-500'>
                  <UserOutlined />
                  <span className="ml-3 text-caption">
                    Resident's Profile
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
                <UserOutlined />
                <span className="px-3">
                  Resident
                </span>
                <CaretDownOutlined />
              </Link>
            </Dropdown>
        </>
    )
}

export default BarangayResident