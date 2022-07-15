import React, {useState, useEffect}from 'react'
import { Link } from 'react-router-dom'
import LogoName from './LogoName'
import { Modal, Input, Select, InputNumber, message} from 'antd'

import { getStorage, ref, getDownloadURL } from "@firebase/storage";

import {UserOutlined} from '@ant-design/icons'

const { Option } = Select;

const ViewProfile = ({ profile }) => {
  const [client, setClient] = useState(null);
  const [isSaving, setIsSaving] = useState(false);  
  const storage = getStorage();

  const onSelectOfImage = async (key, profileID) => {
    setFetchedImage('')

    const sliced = key.split('/');
    const newKey = sliced[0] + "/" + sliced[1] + "/" + profileID + "/" + sliced[2];
    const porRef = ref(storage, newKey);
    const image = await getDownloadURL(ref(porRef))

    setFetchedImage(image)
  }

  useEffect(() => {
      readClient(profile.email)
      .then(data => {      
        setClient({
          ...data.data,
          _id: data.data._id,
          name: data.data.attr.name,
          address: data.data.attr.address,
          birthdate: data.data.attr.birthdate,
          phone: data.data.attr.phone,
          gender: data.data.attr.gender,
          pwd: data.data.categ.pwd,
          fourps: data.data.categ.fourps,
          qrCode: data.data.qrCode,
          pets: data.data.pets,
          email: data.data.email,
          proofOfResidencyFront: data.data.proofOfResidency.image.front,
          proofOfResidencyBack: data.data.proofOfResidency.image.back,
        });
      })  
      .catch(err =>{
        console.log(err)
      })
      // eslint-disable-next-line
  }, [])
  
  const [fetchedImage, setFetchedImage] = useState('');
  const [isPORModalVisible, setIsPORModalVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);

  const checkIfSenior = (date) => {
    const ndate = new Date();  
    const currentYear = ndate.getFullYear();
    const yearBorn = date.split('-')[0];
    const age = currentYear - yearBorn;
    
    if (age < 60) {
      return 'NO'
    }
    
    if (age >= 60) {
      return "YES"
    }
  }

  const getAge = (date) => {
    const ndate = new Date();  
    const currentYear = ndate.getFullYear();
    const yearBorn = date.split('-')[0];
    const age = currentYear - yearBorn;
    return age;
  }

  const handleUpdateProfile = () => {
    setIsSaving(true);
    
    const reqBody = JSON.stringify({ 
      attr: {
        ...client.attr,
        name: client.name,
        address: client.address,
        gender: client.gender,
      },
      categ: {
        ...client.categ,
        pwd: client.pwd,
        fourps: client.fourps      
      }
    });
    
    updateClient(reqBody, client._id)
      .then(() => {        
        message.success(
          <div className='flex items-center font-normal mt-3 text-green-500'>
              Edit profile success
          </div>, 2
        );  
        setIsSaving(false);
        setIsEditProfileVisible(false);
      })
      .catch(err => {
        console.log(err)
        setIsSaving(false)
      })
  }

  const changeGender = (value) => {
    setClient({
      ...client,
      gender: value
    })
  }

  const changePWD = (value) => {
    switch (value) {
      case "YES":
        setClient({
          ...client,
          pwd: true
        })
      break;
      case "NO":
        setClient({
          ...client,
          pwd: false
        })
      break;    
      default:
        setClient({
          ...client,
          pwd: false
        })
      break;
    }
  }

  const changeFourps = (value) => {
    switch (value) {
      case "YES":
        setClient({
          ...client,
          fourps: true
        })
      break;
      case "NO":
        setClient({
          ...client,
          fourps: false
        })
      break;    
      default:
        setClient({
          ...client,
          fourps: false
        })
      break;
    }
  }

  return (
    !client ? 
    ""
    :
    <> 
      <div className="hidden lg:block">
        <div className='flex justify-between bg-blue-500 py-2 items-center px-10'>
            <div>
              <LogoName />
            </div>
            <div className='flex justify-between'>
              <div>
                <Link to="/" className='font-medium text-white'>
                    Return to Dashboard
                </Link>
              </div>
            </div>
        </div>

        <div
          style={{
            width: 1000
          }}
          className='p-5 mx-auto'
        >
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white p-5 shadow rounded col-span-1">
              <div className="flex justify-center">
                <UserOutlined 
                  className='bg-neutral-900 rounded-full p-5'
                  style={{
                    fontSize: "100px", 
                    color:"white"
                  }}
                />
              </div>
                
              <div className="mt-5">
                <h1 className="text-xl font-semibold text-center" style={{textTransform:"capitalize"}} >
                  {client.name} 
                </h1>
                <p className="text-lg text-center" style={{textTransform:"capitalize"}}>
                  {client.role} 
                </p>
              </div>
              
              <div className='flex justify-center'>
                <img  
                  src={client.qrCode} 
                  alt="qr" 
                  className="hover:cursor-pointer w-48" 
                  onClick={ () => setIsModalVisible(true) }
                />

                  <Modal             
                    closable={false}
                    footer={false} 
                    title={false} 
                    visible={isModalVisible} 
                    width={ 300 }
                    onCancel={ () => setIsModalVisible(false) }
                    centered
                  >
                  <img 
                    src={client.qrCode}
                    className='w-full'
                    alt="qr"
                  />
                </Modal>

              </div>

              <div className="flex justify-center items-center">
                <a 
                  href={ client.qrCode } 
                  download={client.name + " West Cupang"}
                  className='p-2 bg-blue-500 rounded text-white px-4 hover:text-white'
                >
                  Download QR Code
                </a>
              </div>

            </div>

            <div className="bg-white p-5 mb-10 shadow rounded col-span-2">
              <div className="flex justify-between items-center mb-10">
                <span 
                  className='text-black text-body font-semibold'
                >
                  Personal Information
                </span>
                <button 
                  className="p-1.5 px-3 bg-blue-500  text-caption hover:bg-blue-400 text-white rounded duration-200"
                  onClick={ () => setIsEditProfileVisible(true) }
                >
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-4 gap-5">
                
                <div className="font-medium text-caption col-span-2">
                  Name:
                </div>
                <div className="col-span-2 text-caption capitalize">
                  {addressTruncator(client.name)}
                </div>

                <div className="font-medium text-caption col-span-2">
                  Birthday:
                </div>
                <div className="col-span-2 text-caption">
                  {client.birthdate}
                </div>

                <div className="font-medium text-caption col-span-2" >
                   Male:
                </div>
                <div className="col-span-2 text-caption capitalize">
                  {client.gender}
                </div>

                <div className="font-medium text-caption col-span-2" >
                  Address:
                </div>
                <div className="col-span-2 text-caption capitalize">
                  {addressTruncator(client.address)}
                </div>

                <div className="font-medium text-caption col-span-2">
                  Email Address:
                </div>
                <div className="col-span-2 text-caption">
                  {addressTruncator(client.email)}
                </div>

                <div className="font-medium text-caption col-span-2">
                  Phone:
                </div>
                <div className="col-span-2 text-caption">
                  {client.phone}
                </div>

                <div className="font-medium text-caption col-span-2">
                  PWD:
                </div>
                <div className="col-span-2 text-caption">
                  { client.pwd ? "YES" : "NO" }
                </div>

                <div className="font-medium text-caption col-span-2">
                  Senior:
                </div>
                <div className="col-span-2 text-caption">
                {  checkIfSenior(client.birthdate) }
                </div>

                <div className="font-medium text-caption col-span-2">
                  4P's:
                </div>
                <div className="col-span-2 text-caption">
                  { client.pwd ? "YES" : "NO" }
                </div>      

                <div className="font-medium text-caption col-span-2">
                  Front ID:
                </div>
                <div className="col-span-2 text-caption">
                  <button
                    className='font-medium text-caption text-blue-500'
                    onClick={ () =>  {
                        onSelectOfImage(client.proofOfResidencyFront, client._id) 
                        setIsPORModalVisible(true);
                      }
                    }
                  >
                    {imageTruncator(client.proofOfResidencyFront)}
                  </button>
                </div>

                <div className="font-medium text-caption col-span-2">
                  Back ID:
                </div>
                <div className="col-span-2 text-caption">
                  <button
                    className='font-medium text-caption text-blue-500'
                    onClick={ () =>  {
                      onSelectOfImage(client.proofOfResidencyBack, client._id) 
                      setIsPORModalVisible(true);
                    }
                  }
                  >
                     {imageTruncator(client.proofOfResidencyBack)}
                  </button>
                </div>                                

              </div>
            </div>
          </div>
        </div>

        <Modal             
          closable={false}
          footer={false} 
          title={false} 
          visible={isPORModalVisible} 
          width={ 700 }
          onCancel={ () => setIsPORModalVisible(false) }
          centered
        >
          {
            fetchedImage ?
            <img 
              src={ fetchedImage }
              className='w-full'
              alt="qr"
            />
            :
            <div className="flex items-center justify-center animte-pulse font-semibold">
              Fetching image...
            </div>
          }
        </Modal><Modal             
          closable={false}
          footer={false} 
          title={false} 
          visible={isPORModalVisible} 
          width={ 700 }
          onCancel={ () => setIsPORModalVisible(false) }
          centered
        >
          {
            fetchedImage ?
            <img 
              src={ fetchedImage }
              className='w-full'
              alt="qr"
            />
            :
            <div className="flex items-center justify-center animte-pulse font-semibold">
              Fetching image...
            </div>
          }
        </Modal>

        <Modal
          title="Edit Profile"
          footer={ false }
          visible={ isEditProfileVisible }
          onCancel={ () => setIsEditProfileVisible(false) }
        >
          
          <p className='font-medium mb-2'>Name</p>
          <Input 
            placeholder='Name' 
            value={ client.name } 
            onChange={ e => setClient({ ...client, name: e.target.value }) } 
            className='mb-5'
          />

          <p className='font-medium mb-2'>Address</p>
          <Input 
            placeholder='Address' 
            value={ client.address } 
            onChange={ e => setClient({ ...client, address: e.target.value }) } 
            className='mb-5'
          />

          <p className='font-medium mb-2'>Age</p>
          <InputNumber
            placeholder='Age' 
            value={ getAge(client.birthdate) } 
            className='mb-5'
            disabled
          />

          <p className='font-medium mb-2'>Birthdate</p>
          <Input 
            placeholder='Birthdate' 
            value={ client.birthdate } 
            className='mb-5'
            disabled
          />

          <p className='font-medium mb-2'>Gender</p>
          <Select 
            placeholder='Gender' 
            value={ client.gender }
            onChange={ changeGender } 
            className='uppercase mb-5'
          >
            <Option value='MALE' />
            <Option value='FEMALE' />
            <Option value='NONE' />
          </Select>

          <p className='font-medium mb-2'>PWD</p>
          <Select 
            placeholder='PWD' 
            value={ client.pwd ? "YES" : "NO" }
            onChange={ changePWD } 
            className='uppercase mb-5'
          >
            <Option value="YES" />
            <Option value="NO" />
          </Select>

          <p className='font-medium mb-2'>4P's</p>
          <Select 
            placeholder='PWD' 
            value={ client.fourps ? "YES" : "NO" }
            onChange={ changeFourps } 
            className='uppercase mb-5'
          >
            <Option value="YES" />
            <Option value="NO" />
          </Select>

          <hr className='my-5' />

          <p className='font-medium mb-2'>Proof of residency</p>
          <button 
            className='font-medium mb-2 text-blue-500 block'
            onClick={ () =>  {
                onSelectOfImage(client.proofOfResidencyFront, client._id) 
                setIsPORModalVisible(true);
                setIsEditProfileVisible(false);
              }
            }
          >
            { imageTruncator(client.proofOfResidencyFront) }
          </button>
          <button 
            className='font-medium mb-2 text-blue-500 block'
            onClick={ () =>  {
                onSelectOfImage(client.proofOfResidencyBack, client._id) 
                setIsPORModalVisible(true);
                setIsEditProfileVisible(false);
              }
            }
          >
            { imageTruncator(client.proofOfResidencyBack) }
          </button>

          <hr className='my-5' />

          <button 
            className="rounded bg-blue-500 text-white py-2 px-5 mr-5"
            onClick={ handleUpdateProfile }
            disabled={ isSaving }
          >
            { isSaving ? 'SAVING...' : 'SAVE' }
          </button>
        </Modal>
  
        <div 
          className="flex justify-center bg-blue-500 items-center py-2 w-full" 
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
          }}
        >
          <h1 className="text-sky-50 font-semibold" id="footer">
            © 2021-2022 TRACK IT PHILIPPINES
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center lg:hidden h-screen">
        <h1 className="font-semibold text-2"> Cannot access through mobile phone</h1>
      </div> 
    </>
  )
}

const readClient = async(email) => {
  const response = await fetch(`/client/${email}`);
  const client = response.json();
  return client;
}

const updateClient = async (reqBody, id) => {
  const response = await fetch(`/client/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: reqBody
  });

  const data = await response.json();
  return data;
}

const imageTruncator = text => {
  return text.split('/')[2].length > 14 ? text.split('/')[2].slice(0,14) + "..." : text.split('/')[2]
}

const addressTruncator = text => {
  return text.length >= 30 ? text.slice(0,30) + " ..." : text;
}

export default ViewProfile