import React, { useState } from 'react'
import {Button, Modal} from 'antd'
import { Link } from 'react-router-dom'
import {EyeOutlined} from '@ant-design/icons'

import { getStorage, ref, getDownloadURL } from "@firebase/storage";

const TemplateProfile = ({ report }) => {

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
        <span className="text-neutral-900">Incident No</span>
      </div>
      <div className="col-span-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{ report._id }</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Full Name (Buong Pangalan)</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{ report.name }</span>
      </div>
      
      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Subject </span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium" style={{textTransform:"capitalize"}}>{ report.subject}</span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Email </span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium">{ report.email}</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Contact</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{report.contact}</span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Date of Incident (Araw ng Insidente)</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium uppercase">{ report.createdAt.slice(0,10)}</span>
      </div>

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Incident's Place (Lugar ng Insidente) </span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium"  style={{textTransform:"capitalize"}}>{ report.location}</span>
      </div>

      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />

      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Details (Detalye)</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <span className="text-neutral-900 font-medium text-justify" style={{textTransform:"capitalize"}}>{ report.detail }</span>
      </div>

     
      <div className="col-span-2 border my-5" />
      <div className="col-span-2 border my-5" />
      
      <div className="col-span-2 pt-2">
        <span className="text-neutral-900">Proof of Incident (Patunay ng Insidente)</span>
      </div>
      <div className="col-span-2 pt-2 flex items-start">
        <span className="font-semibold">:</span>&nbsp;&nbsp;
        <Link 
          to=""
          onClick={ e => { 
              e.preventDefault()
              onSelectOfImage(report.proofOfIncident)
              setIsPORModalVisible(true);
            }
          }
          className="text-neutral-900 font-medium"
        >
          { imageTruncator(report.proofOfIncident) }
        </Link>
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

const ViewActionIncident  = ({ report }) => {
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
              <EyeOutlined className="hover:text-green-500" style={{margin:"-15px", fontSize:"20px"}}/>
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
                  <h1 className="text-xl text-neutral-900 font-semibold m-0 leading-tight"> Incident Report </h1>
                  <div className="grid grid-cols-4 pl-2 justify-between items-center py-5">                                      
                    <TemplateProfile report={report} key={report.key }/>            
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

export default ViewActionIncident