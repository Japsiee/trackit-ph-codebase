import React, {useEffect, useState}  from 'react';
import {Button, Dropdown, Menu} from 'antd'

import {PushpinOutlined} from '@ant-design/icons'

import { Link } from 'react-router-dom'

const ToggleActionIncident = ({ record }) => {   
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    setIncident(record);
    // eslint-disable-next-line
  }, [])  
  
  const updateIncident = async (incidentStatus) => {
    const body = {
      status: incidentStatus
    }

    const response = await fetch("/incident/" + incident._id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  
    const data = await response.json();

    if (data) {
      setIncident({
        ...incident,
        status: incidentStatus
      });
    }
  }  

    const menu = (
        <Menu style={{ margin: 0, padding: 0 }}>
          <Menu.Item className='hover:text-violet-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateIncident('processing');
            }}>
              Proccesing
            </Link>
          </Menu.Item>
          <Menu.Item className='hover:text-yellow-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateIncident('pending');
            }}>
              Pending
            </Link>
          </Menu.Item>
          <Menu.Item className='hover:text-green-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateIncident('completed');
            }}>
              Completed
            </Link>
          </Menu.Item>
          <Menu.Item className='hover:text-red-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateIncident('cancel');
            }}>
              Cancel
            </Link>
          </Menu.Item>
        </Menu>
      );
    
  return (
    !incident ?
    "..."
    :
    <>
      <Dropdown overlay={menu} 
        trigger={['click']} 
        onClick={e => e.preventDefault}
      > 
        <Button type='link'>
          {
            incident.status === 'processing' ?
              <PushpinOutlined style={{ color:"#8b5cf6", fontSize: "20px" }}/>
            :
            incident.status === 'pending' ?
            <PushpinOutlined style={{ color:"#eab308", fontSize: "20px" }}/>
            :
            incident.status === 'completed' ?
            <PushpinOutlined style={{ color:"#22c55e", fontSize: "20px" }}/>
            :
            incident.status === 'cancel' ?
            <PushpinOutlined style={{ color:"#ef4444", fontSize: "20px" }}/>
            :
            <PushpinOutlined style={{ color:"#8b5cf6", fontSize: "20px" }}/>
          }
        </Button>
      </Dropdown>
    </>
  );
};

export default ToggleActionIncident;
