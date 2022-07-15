import React from 'react'
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom'

import { CaretDownOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons'

const SettingsDropDown = () =>{
  
  const settings = (
    <Menu style={{ padding: 0 }}>
      <Menu.Item className='hover:text-blue-500' style={{ margin: 0 , padding:"10px 15px"}} key="1">
        <a href="http://cupangwest.cityofbalanga.gov.ph/" target="_blank" rel="noreferrer">
          <div className='flex justify-start items-center hover:text-blue-500'>
            <LinkOutlined />
            <span className="ml-3">
              About Us 
            </span>
          </div>
        </a>
      </Menu.Item>
      <Menu.Item className='hover:text-blue-500' style={{ margin: 0, padding:"10px 15px" }} key="2">
        <Link to="/view-profile">
          <div className='flex justify-start items-center hover:text-blue-500'>
            <UserOutlined />
            <span className="ml-3">
              View Profile
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
                onClick={ e => e.preventDefault() }
              >
                <i className="fas fa-cog" />
                <span className="px-3">
                  Settings 
                </span>
                <CaretDownOutlined />
              </Link>
            </Dropdown>
        </>
    )
}

export default SettingsDropDown