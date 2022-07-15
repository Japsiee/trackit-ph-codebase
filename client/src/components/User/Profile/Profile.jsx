import React, { useState, useEffect, useContext } from 'react';
import Footer from '../Footer/Footer';
import { Tooltip, Input, Select, Form, Space, Button, Table, Popover } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { UserInfoContext } from '../../../contexts/UserInfoContext';

const { Option } = Select;

const Profile = () => {
  const { userInfo, setUserInfo, setLoading } = useContext(UserInfoContext)
  const [removePopIsVisible, setRemovePopIsVisible] = useState('')
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (!user) {
      setUser(userInfo)
    }
    // eslint-disable-next-line
  }, [userInfo])

  useEffect(() => {
    if (user) {
      if (!user.pets || user.pets.length <= 0) {

      } else {
        const newPets = user.pets.map((pet, index) => {
          return {
            key: index,
            type: pet.type,
            quantity: pet.quantity
          }
        })

        setPets(newPets);
      }
    }
  }, [user])

  const saveProfile = value => {
    setLoading(true);
    
    // if (value.pets) {
    //   const allPet = [...pets]
      
    //   value.pets.forEach((pet, i) => {
    //     allPet.push(pet);
  
    //     if (i === value.pets.length - 1) {              
    //       const reqBody = JSON.stringify({ ...user, pets: allPet })
    //       updateProfile(reqBody)
    //         .then(() => {
    //           setUserInfo({ ...user, pets: allPet })
    //           setLoading(false);
    //         })
    //     }
    //   })
    // } else {

    // }
    
    let allPet = [...pets]

    if (value.pets) {
      allPet = [...pets, ...value.pets];
    }

    const reqBody = JSON.stringify({ ...user, pets: allPet })

    updateProfile(reqBody)
      .then(() => {
        setUserInfo({ ...user, pets: allPet })
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      })
  }

  const updateProfile = async (reqBody) => {
    const result = await fetch(`/client/${userInfo._id}`, {
      method: "PUT",
      body: reqBody,
      headers: { "Content-Type": "application/json" }
    })

    const data = await result.json()    
    return data;
  }

  const removePet = petType => {
    const filterPet = pets.filter(pet => {
      return pet.type !== petType;
    })

    setPets(filterPet)
  }

  const removeContent = (petType) => (
    <div>
      <p className='font-semibold'>
        Are you sure you want to remove this pet?
      </p>

      <div className="flex justify-end items-center">
        <div className='flex mt-4'>
          <Space size={ 20 }>
            <button 
              className='text-green-500 font-bold flex items-center'
              onClick={ () => removePet(petType) }
            >
              <CheckOutlined />
              <span className='ml-2'>
                YES
              </span>
            </button>
            <button 
              className='text-red-500 font-bold flex items-center'
              onClick={ () => setRemovePopIsVisible('') } 
            >
              <CloseOutlined />
              <span className='ml-2'>
                NO
              </span>
            </button>
          </Space>
        </div>
      </div>
    </div>
  )

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: text => <p>{text}</p>
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (value, record) => (
        <Space>
          <Popover
            trigger="click"
            content={ removeContent(record.type) }
            visible={ record.key === removePopIsVisible ? true : false }
          >
            <button 
              type="button"
              onClick={ () => setRemovePopIsVisible(record.key) } 
              className='bg-red-500 p-2 text-2xl rounded font-semibold flex items-center text-white'
            >
              <DeleteOutlined />
            </button>
          </Popover>
        </Space>
      )
    }
  ];

  return(
    !user ?
    <div 
      className="w-full mx-auto px-3" 
      style={{
        maxWidth: "600px"
      }}
    >
      <div className="shadow p-5 my-5 bg-white mb-20">
        <div className="p-4 bg-gray-200 w-2/6 animate-pulse" />        

        <hr className="my-5 animate-pulse" />

        <div className="flex justify-center items-center mb-5">
          <div className="p-5 w-44 h-44 rounded-full bg-gray-200 animate-pulse" />
        </div>

        <div className="p-4 w-3/6 mx-auto bg-gray-200 animate-pulse" />

        <div className="my-5">
          <div className="p-4 w-2/6 animate-pulse bg-gray-200 mb-3" />
          <div className="p-20 animate-pulse bg-gray-200 mb-5" />

          <div className="p-4 w-2/6 animate-pulse bg-gray-200 mb-3" />
          <div className="p-20 animate-pulse bg-gray-200 mb-5" />

          <div className="p-4 w-2/6 animate-pulse bg-gray-200 mb-3" />
          <div className="p-20 animate-pulse bg-gray-200 mb-5" />
        </div>
      </div>
      
    </div>
    :
    <>
      <div 
        className="w-full mx-auto px-3" 
        style={{
          maxWidth: "600px"
        }}
      >
        <div className="shadow p-5 my-5 bg-white mb-20">
          <h1 className="text-gray-700 font-semibold text-subheading">
            Update Profile
          </h1>

          <hr className="my-5" />

          <div className="flex items-center justify-center">
            <i className="fas fa-user-circle text-9xl" />
          </div>

          <h1 className="capitalize text-center text-subheading font-semibold mt-5 flex items-center justify-center">
            <span className='mr-3'>
            { user.name }
            </span>
            <Tooltip placement="bottom" title='Visit your barangay admin for requesting to change your name' className='flex items-center'>
              <button>
                <QuestionCircleOutlined />
              </button>
            </Tooltip>
          </h1>

          <Form 
            style={{ marginTop: '15px' }}
            onFinish={ saveProfile }
          >
          <div id="content">
            <div className="field mt-4">
              <h3 className='font-semibold'>
                Address
              </h3>
              <Input.TextArea 
                autoSize={{ minRows: 3, maxRows: 3 }} 
                placeholder="Input your home address"
                value={ user.address }
                disabled
              />
            </div>

            <div className="field mt-4">
              <h3 className='font-semibold'>
                Email
              </h3>
              <Input 
                placeholder='Input your email' 
                value={ user.email }
                disabled
              />
            </div>

            <div className="field mt-4">
              <h3 className='font-semibold'>
                Phone Number
              </h3>
              <Input 
                placeholder='Input your phone number'                 
                value={ user.phone }
                disabled
              />
            </div>

            <div className="field mt-4">
              <h3 className='font-semibold'>
                Gender
              </h3>
              <Select
                defaultValue={ user.gender.toUpperCase() }
                className='w-full'
                disabled
              >
                <Option value='MALE'>
                  MALE
                </Option>
                <Option value='FEMALE'>
                  FEMALE
                </Option>
              </Select>
            </div>

            <div className="field mt-4">
              <h3 className='font-semibold'>Birthday</h3>
              <Input 
                value={ user.birthdate }
                disabled
              />
            </div>

            <div className="field mt-4">
              <h3 className='font-semibold'>PWD</h3>
              <Input 
                value={ user.categ.pwd }
                disabled
              />
            </div>

            <div className="field mt-4">
              <h3 className='font-semibold'>4P's</h3>
              <Input 
                value={ user.categ.fourps }
                disabled
              />
            </div>

            <div className="field mt-4">
              <h3 className='font-semibold'>Pets</h3>
              <Table columns={columns} dataSource={pets} pagination={ false } />        
              
                <Form.List name="pets">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginTop: 15 }} align="baseline">
                          <Form.Item
                            {...restField}
                            name={[name, 'type']}
                            style={{
                              lineHeight: 0,
                              margin: "10px 0"
                            }}
                            rules={[{ required: true, message: 'Missing pet type' }]}
                          >
                            <Select placeholder="Type of Pet" style={{ width: '200px' }}>
                              <Option value="dog">Dog</Option>
                              <Option value="cat">Cat</Option>
                              <Option value="bird">Bird</Option>
                              <Option value="cow">Cow</Option>
                              <Option value="snake">Snake</Option>
                              <Option value="chicken">Chicken</Option>
                              <Option value="goat">Goat</Option>
                              <Option value="sheep">Sheep</Option>
                              <Option value="horse">Horse</Option>
                              <Option value="other">Other</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'quantity']}
                            style={{
                              lineHeight: 0,
                              margin: "10px 0"
                            }}
                            rules={[{ required: true, message: 'Missing pet quantity' }]}
                          >
                            <Input placeholder="Pet quantity" />
                          </Form.Item>
                          <button 
                            type="button"
                            onClick={ () => remove(name) }
                            className='bg-red-500 p-2 text-caption text-center rounded font-semibold flex items-center text-white'
                            style={{marginBottom: '-8px'}}
                            >
                            <DeleteOutlined />
                          </button>
                        </Space>
                      ))}
                      <Form.Item
                        style={{
                          lineHeight: 0,
                          margin: "10px 0"
                        }}
                      >
                        <Button type="default" onClick={() => add()} block>
                          Add pet
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>


                <div className='flex justify-center my-5'>
                  <button 
                    type="submit"
                    className='bg-blue-500 text-white px-4 py-1.5 text-caption rounded mt-2 font-semibold hover:bg-blue-400 duration-200'
                  >
                    Save Updates
                  </button>
                </div>
            </div>

          </div>
          </Form>
        </div>          
      </div>
      <Footer />
    </>
  )
}

export default Profile;