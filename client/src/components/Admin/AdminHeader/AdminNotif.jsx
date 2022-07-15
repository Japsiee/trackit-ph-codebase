import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown } from 'antd';

import { BellOutlined, IssuesCloseOutlined } from '@ant-design/icons'

const AdminNotif = () =>{

    const notification = (
      <Menu style={{ padding: 0 }}>
        <Menu.Item className='hover:text-blue-500' style={{ margin: 0 }} key="1">
            <Link 
                to="" 
                onClick={ e => {
                    e.preventDefault();
                }}
            >
                <div className='flex justify-start items-center hover:text-blue-500'>
                  <IssuesCloseOutlined />
                  <span className="ml-3">
                      Etc.
                  </span>
                </div>
            </Link>
        </Menu.Item>
        <Menu.Item className='hover:text-blue-500' style={{ margin: 0 }} key="2">
            <Link 
                to="/" 
                onClick={ e => {
                    e.preventDefault();
                }}
            >
                <div className='flex justify-start items-center hover:text-blue-500'>
                  <IssuesCloseOutlined />
                  <span className="ml-3">
                      Etc.
                  </span>
                </div> 
            </Link>
        </Menu.Item>
      </Menu>
    );
    
    return(
        <>
            {/*Notification*/}            

            <Dropdown 
              overlay={notification} 
              placement='bottomCenter' 
              className='flex justify-center items-center text-white'
              trigger={['click']} 
            >
              <Link 
                to=""
                onClick={ e => e.preventDefault() }
              >
                <BellOutlined className='text-3xl' />
              </Link>
            </Dropdown>
        </>
    )
}

export default AdminNotif