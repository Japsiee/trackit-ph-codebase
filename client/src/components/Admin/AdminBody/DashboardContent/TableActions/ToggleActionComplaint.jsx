import React, {useEffect, useState}  from 'react';
import {Button, Dropdown, Menu} from 'antd'

import {PushpinOutlined} from '@ant-design/icons'

import { Link } from 'react-router-dom'

const ToggleActionComplaint = ({ record }) => {   
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    setComplaint(record);
    // eslint-disable-next-line
  }, [])  
  
  const updateComplaint = async (complaintStatus) => {
    const body = {
      status: complaintStatus
    }

    const response = await fetch("/complaint/" + complaint._id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  
    const data = await response.json();

    if (data) {
      setComplaint({
        ...complaint,
        status: complaintStatus
      });
    }
  }  

    const menu = (
        <Menu style={{ margin: 0, padding: 0 }}>
          <Menu.Item className='hover:text-violet-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateComplaint('processing');
            }}>
              Proccesing
            </Link>
          </Menu.Item>
          <Menu.Item className='hover:text-yellow-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateComplaint('pending');
            }}>
              Pending
            </Link>
          </Menu.Item>
          <Menu.Item className='hover:text-green-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateComplaint('completed');
            }}>
              Completed
            </Link>
          </Menu.Item>
          <Menu.Item className='hover:text-red-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateComplaint('cancel');
            }}>
              Cancel
            </Link>
          </Menu.Item>
        </Menu>
      );
    
  return (
    !complaint ?
    "..."
    :
    <>
      <Dropdown overlay={menu} 
        trigger={['click']} 
        onClick={e => e.preventDefault}
      > 
        <Button type='link'>
          {
            complaint.status === 'processing' ?
              <PushpinOutlined style={{ color:"#8b5cf6", fontSize: "20px" }}/>
            :
            complaint.status === 'pending' ?
            <PushpinOutlined style={{ color:"#eab308", fontSize: "20px" }}/>
            :
            complaint.status === 'completed' ?
            <PushpinOutlined style={{ color:"#22c55e", fontSize: "20px" }}/>
            :
            complaint.status === 'cancel' ?
            <PushpinOutlined style={{ color:"#ef4444", fontSize: "20px" }}/>
            :
            <PushpinOutlined style={{ color:"#8b5cf6", fontSize: "20px" }}/>
          }
        </Button>
      </Dropdown>
    </>
  );
};

export default ToggleActionComplaint;
