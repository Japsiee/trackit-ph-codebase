import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { UserOutlined } from "@ant-design/icons"
import { Input, Modal, message } from 'antd'
// import SearchBar from "../Admin/AdminBody/DashboardContent/SearchBar"

const MonitorAdmin = () => {
  const [myAdmins, setMyAdmins] = useState(null);
  const [isModalAddAdminVisible, setIsModalAddAdminVisible] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  useEffect(() => {
    fetchClient()
    .then(data => {
      const filteredAdmins = data.data.filter(adm => adm.attr.role === 'admin')
      setMyAdmins(filteredAdmins)
    })
    .catch(err => {
      console.log(err);
    })
  })
      // Real Time Date
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateClient = () => {    
    updateClient(clientEmail, selectedUserType)
    .then(data => {        
        if (data) {
          setIsModalAddAdminVisible(false)
          message.success(
            <div className='flex items-center font-normal mt-3 text-green-500'>
                Successfully switch someone's role
            </div>, 2
          );
        } else {
          setIsModalAddAdminVisible(false)
          message.error(
            <div className='flex items-center font-normal mt-3 text-red-500'>
                Failed to switch someone's role
            </div>, 2
          );
        }

        setClientEmail('')
        setSelectedUserType('')
      })
  }

  return (
    <>
          <div className='flex justify-between px-10' style={{padding:"20px 25px"}}>
                <div>
                  <p className='font-medium text-lg'>Welcome Super Admin</p>
                  <p className='text-lg m-0'>
                    {dateState.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                  </p>   
                </div>
                <button className="px-5 py-2 bg-blue-500 text-white font-semibold rounded" onClick={ () => setIsModalAddAdminVisible(true) }>
                  Switch User Roles
                </button>

                <Modal
                  visible={ isModalAddAdminVisible }
                  centered            
                  closable={false}
                  footer={false} 
                  title={false} 
                >
                  <Input placeholder='Email of a resident' value={ clientEmail } onChange={ e => setClientEmail(e.target.value) }/>

                  <div 
                    className="grid grid-cols-3 gap-5"
                    style={{
                      margin: "10px 0"
                    }}
                  >
                    <div 
                      className={
                        selectedUserType === 'user' ?
                        'role-box-selected'
                        :
                        'role-box'
                      }
                      onClick={ () => setSelectedUserType('user') }
                    >
                      USER
                    </div>
                    <div 
                      className={
                        selectedUserType === 'admin' ?
                        'role-box-selected'
                        :
                        'role-box'
                      }
                      onClick={ () => setSelectedUserType('admin') }
                    >
                      ADMIN
                    </div>
                    <div 
                      className={
                        selectedUserType === 'super' ?
                        'role-box-selected'
                        :
                        'role-box'
                      }
                      onClick={ () => setSelectedUserType('super') }
                    >
                      SUPER
                    </div>
                  </div>

                  <button 
                    className="px-5 py-2 bg-blue-500 text-white font-semibold rounded"
                    onClick={ handleUpdateClient }
                  >
                    Save
                  </button>
                  <button 
                    className="px-5 py-2 bg-white text-blue-500 font-semibold rounded shadow ml-3"
                    onClick={ () => setIsModalAddAdminVisible(false) }
                  >
                    Cancel
                  </button>
                </Modal>
                {/* <SearchBar /> */}
              </div>
              <div className="grid grid-cols-3 grid-rows-1 gap-5" style={{
                paddingRight: "25px",
                paddingLeft: "25px",               
              }}>
                  {
                  !myAdmins || !myAdmins.length === 0 ?
                  ""
                  :
                  myAdmins.map((user, i) => (
                    <div className='flex justify-around items-center border-2' key={ i } 
                        style={{
                          paddingTop: "60px",
                          paddingBottom: "60px"
                        }}>
                      <div>
                          <div className="flex justify-center">
                          <Link to="" className='text-white hover:text-gray-700 duration-200'>
                            <UserOutlined 
                              className='bg-neutral-900 rounded-full p-5 hover:bg-blue-400'
                              onClick={showModal}
                              style={{
                                fontSize: "100px", 
                                color:"white"
                              }}
                            />
                          </Link>
                          <Modal       
                            centered            
                            closable={false}
                            footer={false} 
                            title={false} 
                            visible={isModalVisible} 
                            onCancel={handleCancel}
                          >
                            <div className='flex justify-center'>
                              <UserOutlined 
                                  className='bg-neutral-900 rounded-full'
                                  style={{
                                    fontSize: "500px", 
                                    color:"white",
                                    margin:"10px"
                                  }}
                                />
                            </div>
                        </Modal>
                          </div>
                          <div className='flex justify-center text-neutral-900 bg-gray-50 uppercase' 
                            style={{
                              paddingTop: "20px"
                            }}> 
                          {user.attr.role} </div>
                          <div className='flex justify-center text-neutral-900 text-xl bg-gray-50 font-medium uppercase text-center'
                            style={{
                              padding: "5px 40px"
                            }}
                          > {user.attr.name} </div>
                      </div>
                    </div> 
                  ))
                  }
            </div>
    </>
  )
}

const fetchClient = async () => {
  const response = await fetch('/client');
  const data = response.json();
  return data;
}

const updateClient = async (clientEmail, type) => {
  try {
    const responseRead = await fetch('/client/' + clientEmail);
    const result = await responseRead.json();
    const person = result.data
    const reqBody = {
      ...person,
      attr: {
        ...person.attr,
        role: type
      }
    }
  
    if (result) {
      const responseUpdate = await fetch('/client/' + person._id, {
        method: "PUT",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" }
      })
      const data = await responseUpdate.json();
  
      if (data) {
        return true
      }
    }
  } catch(error) {
    return false;
  }
}

export default MonitorAdmin