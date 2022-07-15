import React, {useEffect, useState}  from 'react';
import {Button, Dropdown, Menu} from 'antd'

import {PushpinOutlined} from '@ant-design/icons'

import { Link } from 'react-router-dom'

const ToggleAction = ({ docs }) => {   
  const [document, setDocument] = useState(null);

  useEffect(() => {
    setDocument(docs);
    // eslint-disable-next-line
  }, [])  
  
  const updateDocument = async (documentStatus) => {
    const body = {
      status: documentStatus
    }

    const response = await fetch("/document/" + document._id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  
    const data = await response.json();

    if (data) {
      setDocument({
        ...document,
        status: documentStatus
      });

      if (documentStatus === 'completed') {
        sendNotification()
          .then(data => console.log(data))
          .catch(err => console.log(err))
      }
    }
  }  

  const sendNotification = async () => {
    const reqBody = {
      receiverEmail: docs.email,
      message: 'Your request request document is now available. Please claim it at the barangay office.'
    }

    const response = await fetch('/client/emailNotification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })

    const data = await response.json();
    return data;
  }

    const menu = (
        <Menu style={{ margin: 0, padding: 0 }}>
          <Menu.Item className='hover:text-violet-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateDocument('processing');
            }}>
              Proccesing
            </Link>
          </Menu.Item>
          <Menu.Item className='hover:text-yellow-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateDocument('pending');
            }}>
              Pending
            </Link>
          </Menu.Item>
          <Menu.Item className='hover:text-green-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateDocument('completed');
            }}>
              Completed
            </Link>
          </Menu.Item>
          <Menu.Item className='hover:text-red-500'>
            <Link to="" onClick={(e) => {
              e.preventDefault()
              updateDocument('cancel');
            }}>
              Cancel
            </Link>
          </Menu.Item>
        </Menu>
      );
    
  return (
    !document ?
    "..."
    :
    <>
      <Dropdown overlay={menu} 
        trigger={['click']} 
        onClick={e => e.preventDefault}
      > 
        <Button type='link'>
          {
            document.status === 'processing' ?
              <PushpinOutlined style={{ color:"#8b5cf6", fontSize: "20px" }}/>
            :
            document.status === 'pending' ?
            <PushpinOutlined style={{ color:"#eab308", fontSize: "20px" }}/>
            :
            document.status === 'completed' ?
            <PushpinOutlined style={{ color:"#22c55e", fontSize: "20px" }}/>
            :
            document.status === 'cancel' ?
            <PushpinOutlined style={{ color:"#ef4444", fontSize: "20px" }}/>
            :
            <PushpinOutlined style={{ color:"#8b5cf6", fontSize: "20px" }}/>
          }
        </Button>
      </Dropdown>
    </>
  );
};

export default ToggleAction;
