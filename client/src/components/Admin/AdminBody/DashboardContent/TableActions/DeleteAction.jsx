import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Button, Modal} from 'antd'

import {DeleteOutlined} from '@ant-design/icons'

const DeleteAction = ({ record }) => {  
  const navigate = useNavigate();
  const [visibleDelete, setVisibleDelete] = React.useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = React.useState(false);
  const [modalTextDelete, setModalTextDelete] = React.useState('Do you really want to delete this profile?');

  const deleteClient = async () => {
    const result = await fetch(`/client/${record}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })

    const data = await result.json();
    return data;
  }

  const deleteModal = () => {
    setModalTextDelete("Do you really want to delete this profile?");
    setVisibleDelete(true);
  };

  const deleteOk = () => {
    setModalTextDelete('Deleting Profile...');
    setConfirmLoadingDelete(true);

    deleteClient()
      .then(() => {
        setVisibleDelete(false);
        setConfirmLoadingDelete(false);      
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        setVisibleDelete(false);
        setConfirmLoadingDelete(false);
      })
  };

  const deleteCancel = () => {
    setVisibleDelete(false);
  };

  return(
    <>
      <Button type="link" onClick={deleteModal}>
        <DeleteOutlined className="hover:text-red-500" 
          style={{
            fontSize:"20px"
          }} 
        /> 
      </Button>
      <Modal
        title={
          <>
            <i className="fas fa-exclamation-triangle fa-lg text-red-500" />
            <span 
              className='text-red-500'
              style={{
                marginLeft: '5px'
              }}                
            >
              Deletion of Resident's Profile
            </span>
          </>
        }
        visible={visibleDelete}
        onOk={deleteOk}
        okText={"Delete"}
        confirmLoading={confirmLoadingDelete}
        bodyStyle={{height:"75px"}}
        onCancel={deleteCancel}
        footer={ 
          <div> 
            <Button 
              type="primary" 
              danger 
              ghost 
              onClick={deleteCancel} 
              style={{
                color:"#ef4444"
              }}
            >
              Cancel
            </Button>
            <Button 
              danger 
              loading={confirmLoadingDelete} 
              ghost 
              onClick={deleteOk} 
              style={{
                background:"#ef4444", 
                color:"white"
              }}
            >
              Confirm &amp; Delete
            </Button>
          </div>
        }
      >
        <p>{modalTextDelete}</p>
      </Modal> 
    </>
  )
}

export default DeleteAction