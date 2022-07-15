import React, { useState } from 'react'
import {Button, Modal} from 'antd'
import { Link } from 'react-router-dom'
import { EyeOutlined } from '@ant-design/icons'

import { getStorage, ref, getDownloadURL } from "@firebase/storage";

const TemplateProfile = ({ announcement }) => {
  const [fetchedImage, setFetchedImage] = useState('');
  const [isPORModalVisible, setIsPORModalVisible] = useState(false)
  const storage = getStorage();

  const onSelectOfImage = async (key) => {
    if (key) {
      setFetchedImage('')

      const porRef = ref(storage, key);
      const image = await getDownloadURL(ref(porRef))
  
      setFetchedImage(image)
    }
  }

  return(
    <>
     <div className="col-span-2">
        <span className="text-neutral-900">Announcement No.</span>
      </div>
      <div className="col-span-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{ announcement._id }</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Announcement Title</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{ announcement.title }</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Date Published </span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{ announcement.createdAt.slice(0,10) }</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Details</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium text-justify">{ announcement.description }</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Photo </span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <Link 
          to=""
          onClick={ e => { 
              e.preventDefault()
              onSelectOfImage(announcement.attachedImage)
              setIsPORModalVisible(true);
            }
          }
          className="text-neutral-900 font-medium"
        >
          { imageTruncator(announcement.attachedImage) }
        </Link>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Photo By </span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium capitalize">{ announcement.photoBy }</span>
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

const ViewActionAnnouncements  = ({ announcement }) => {
    const [visibleView, setVisibleView] = React.useState(false);
    const [confirmLoadingView,] = React.useState(false);
    const viewModal = () => {
      setVisibleView(true);
    };
  
    const viewCancel = () => {
      console.log('Clicked cancel button');
      setVisibleView(false);
    };

    return(
        <>
            <Button type="link" onClick={viewModal}>
              <EyeOutlined className="hover:text-green-500" style={{fontSize:"20px"}}/>
            </Button>
            <Modal
                title={<p className="text-blue-500 text-lg" style={{marginBottom:"0"}}>Review User</p>}
                visible={visibleView}
                confirmLoading={confirmLoadingView}
                onCancel={viewCancel}
                width={750}
                style={{top:40}}
                footer={false}>
                 <div className="w-full">
                  <h1 className="text-xl text-neutral-900 font-semibold m-0 leading-tight"> Announcement </h1>
                  <div className="grid grid-cols-4 pl-2 justify-between items-center py-5">                                      
                    <TemplateProfile announcement={announcement} key={announcement.key }/>            
                  </div>
                </div>
            </Modal>
        </>
)}

const imageTruncator = text => {
  if (text) {
    return text.split('/')[3].length > 14 ? text.split('/')[3].slice(0,14) + "..." : text.split('/')[3]
  } else {
    return ''
  }
}

export default ViewActionAnnouncements