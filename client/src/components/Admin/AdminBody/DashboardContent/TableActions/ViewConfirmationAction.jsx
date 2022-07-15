import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Modal} from 'antd'
import {EyeOutlined} from '@ant-design/icons'

import { getStorage, ref, getDownloadURL } from "@firebase/storage";

const TemplateProfile = ({ profile }) => {
  const storage = getStorage();
  const [fetchedImage, setFetchedImage] = useState('');
  const [isPORModalVisible, setIsPORModalVisible] = useState(false)

  const onSelectOfImage = async (key, profileID) => {
    setFetchedImage('')

    const sliced = key.split('/');
    const newKey = sliced[0] + "/" + sliced[1] + "/" + profileID + "/" + sliced[2];
    const porRef = ref(storage, newKey);
    const image = await getDownloadURL(ref(porRef))

    setFetchedImage(image)
  }
  
  const countPet = (pets) => {
    if (!pets || pets.length === 0) {
      return 0
    } else {
      let totalPetQuantity = 0;

      const petQuant = pets.map(pet => {
        return parseInt(pet.quantity)
      })

      for(let i = 0; i < petQuant.length; i++) {
        totalPetQuantity += petQuant[i]
      }

      return totalPetQuantity
    }
  }

  const checkIfSenior = (date) => {
    const ndate = new Date();  
    const currentYear = ndate.getFullYear();
    const yearBorn = date.split('-')[0];
    const age = currentYear - yearBorn;
    
    if (age < 40) {
      return 'NO'
    }
    
    if (age >= 40) {
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

  return(
    <>
      <div className="col-span-2">
        <span className="text-neutral-900">Full Name</span>
      </div>
      <div className="col-span-2 row-span-auto flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ profile.fullname }</span>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">Address</span>
      </div>
      <div className="col-span-2 row-span-auto flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ profile.address }</span>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">Birthdate</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ profile.birthdate }</span>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">Age</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ getAge(profile.birthdate) }</span>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">Gender</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ profile.attr.gender }</span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2">
        <span className="text-neutral-900">Phone</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ profile.attr.phone }</span>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">Email Address</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium ml-2">{ addressTruncator(profile.email) }</span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2">
        <span className="text-neutral-900">Senior Citizen</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ checkIfSenior(profile.birthdate) }</span>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">4P's</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ profile.categ.fourps ? "YES" : "NO" }</span>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">PWD</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ profile.categ.pwd ? "YES" : "NO" }</span>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">Pet Quantity</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:</span>
        <span className="text-neutral-900 font-medium uppercase ml-2">
          { countPet(profile.pets) }
        </span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2">
        <span className="text-neutral-900">ID Type</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">: </span>
        <span className="text-neutral-900 font-medium uppercase ml-2">{ profile.proofOfResidency.typeOfID }</span>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">FRONT ID</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:&nbsp;&nbsp;</span>
        <button
          className='font-medium text-blue-500'
          onClick={ () =>  {
            onSelectOfImage(profile.proofOfResidency.image.front, profile._id) 
            setIsPORModalVisible(true);
          }
        }
        >
            {imageTruncator(profile.proofOfResidency.image.front)}
        </button>
      </div>

      <div className="col-span-2">
        <span className="text-neutral-900">BACK ID</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-semibold">:&nbsp;&nbsp;</span>
        <button
          className='font-medium text-blue-500'
          onClick={ () =>  {
            onSelectOfImage(profile.proofOfResidency.image.back, profile._id) 
            setIsPORModalVisible(true);
          }
        }
        >
            {imageTruncator(profile.proofOfResidency.image.back)}
        </button>
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
        </Modal>
    </>
  )
}

const ViewConfirmationAction  = ({ record }) => {
  const navigate = useNavigate()
  const [visibleView, setVisibleView] = React.useState(false);
  const [confirmLoadingView, setConfirmLoadingView] = React.useState(false);
  const [modalTextView, setModalTextView] = React.useState(null);

  const approveClient = async () => {
    const result = await fetch(`/client/${record._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        approved: true
      }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await result.json();
    return data;
  }

  const emailClient = async () => {
    const result = await fetch(`/client`, {
      method: 'PUT',
      body: JSON.stringify({
        receiverEmail: record.email,
        receiverPasscode: record.attr.password,
        receiverName: record.attr.name
      }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await result.json();
    return data;
  }

  const viewModal = () => {
    setModalTextView(
    <div className="w-full">
      <h1 className="text-xl text-neutral-900 font-semibold m-0 leading-tight">Barangay Resident Information </h1>        
      <div 
        className="grid grid-cols-4 justify-between items-center py-5"
        style={{
          gridGap: '10px'
        }}
      > 
        <TemplateProfile profile={record} key={ record.key }/>            
      </div>

    </div>)
    setVisibleView(true);
  };
  
  const viewOk = () => {
    setConfirmLoadingView(true);
    setModalTextView('Accepting .... ');

    approveClient()
      .then(data => {
        setVisibleView(false);
        setConfirmLoadingView(false);

        emailClient()
          .then(data => {
            console.log(data)
            navigate('/resident-profile');
          })
      })
      .catch(err => {
        console.log(err);
        setVisibleView(false);
        setConfirmLoadingView(false);
      })
  };
  
    const viewCancel = () => {
    setVisibleView(false);
  };

  return(
    <>
      <Button type="link" onClick={viewModal}>
        <EyeOutlined className="hover:text-green-500" style={{ fontSize:"20px" }}/> 
      </Button>
      <Modal
        title={<p className="text-blue-500 text-lg" style={{marginBottom:"0"}}>Review User</p>}
        visible={visibleView}
        confirmLoading={confirmLoadingView}
        onCancel={viewCancel}
        width={700}
        centered
        footer={ 
          <div> 
            <Button type='primary' ghost onClick={viewCancel}>
              Cancel
            </Button>
            <Button 
              loading={confirmLoadingView} 
              ghost 
              onClick={viewOk} 
              style={{
                background:"#3b82f6", 
                color:"white"
              }}
            >
              Accept
            </Button>
          </div>
        }
      >
        {modalTextView}
      </Modal>
    </>
  )
}

const imageTruncator = text => {
  if (text) {
    return text.split('/')[2].length > 14 ? text.split('/')[2].slice(0,14) + "..." : text.split('/')[2]
  } else {
    return ''
  }
}

const addressTruncator = text => {
  return text.length >= 30 ? text.slice(0,30) + " ..." : text;
}

export default ViewConfirmationAction