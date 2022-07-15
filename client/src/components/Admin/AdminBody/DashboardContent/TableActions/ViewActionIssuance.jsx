import React, { useState } from 'react'
import {Button, Modal} from 'antd'
import {EyeOutlined} from '@ant-design/icons'

import { getStorage, ref, getDownloadURL } from "@firebase/storage";

const TemplateProfile = ({ document }) => {
  const storage = getStorage();
  const [fetchedImage, setFetchedImage] = useState('');
  const [isPORModalVisible, setIsPORModalVisible] = useState(false)

  const onSelectOfImage = async (key) => {
    setFetchedImage('')

    const porRef = ref(storage, key);
    const image = await getDownloadURL(ref(porRef))

    setFetchedImage(image)
  }

  return(
    <>
     <div className="col-span-2">
        <span className="text-neutral-900">Issuance No</span>
      </div>
      <div className="col-span-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{ document._id }</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Full Name (Buong Pangalan)</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{ document.name }</span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Document Type (Uri ng Dokumento)</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{ document.typeOfDocument }</span>
      </div>
      
      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Date Requested (Araw ng hilingin) </span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{document.createdAt.slice(0,10)}
            </span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Message (Mensahe)</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium text-justify" style={{textTransform:"capitalize"}}>{ document.message }</span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Contact</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase text-justify">{ document.contact }</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Email</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium text-justify">{ document.email}</span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />
      
      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Type of ID</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase text-justify">{ document.typeOfID}</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Front ID </span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <button
          className='font-medium text-blue-500'
          onClick={ () =>  {
            onSelectOfImage(document.proofOfID.uno) 
            setIsPORModalVisible(true);
          }
        }
        >
            {imageTruncator(document.proofOfID.uno)}
        </button>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Back ID </span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <button
          className='font-medium text-blue-500'
          onClick={ () =>  {
            onSelectOfImage(document.proofOfID.dos) 
            setIsPORModalVisible(true);
          }
        }
        >
            {imageTruncator(document.proofOfID.dos)}
        </button>
      </div>

      {/* <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Authorization Letter</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium"> 
        <Link 
          to=""
          onClick={ e => e.preventDefault() }
          className="text-neutral-900 font-medium"
        >
          Image 3
        </Link></span>
      </div>  */}
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

const ViewActionIssuance  = ({ document }) => {
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
                  <h1 className="text-xl text-neutral-900 font-semibold m-0 leading-tight"> Issuance Report </h1>
                  <div className="grid grid-cols-4 justify-between items-center py-5">                                      
                    <TemplateProfile document={document} key={document._id }/>            
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

export default ViewActionIssuance