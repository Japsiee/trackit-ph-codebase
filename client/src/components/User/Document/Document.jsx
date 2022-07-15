import { useState, useContext } from 'react';
import { Select, Form, Input } from 'antd';
import Footer from '../Footer/Footer';

import { useNavigate } from 'react-router-dom';

import LoadingEffect from '../../Unauthorized/LoadingEffect'
import { UserInfoContext } from '../../../contexts/UserInfoContext';

import { storage } from '../../../firebase/index'
import { ref, uploadBytesResumable } from '@firebase/storage'

const { Option } = Select;

const Document = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { userInfo, loading, setLoading } = useContext(UserInfoContext)
  const [proofs, setProofs] = useState({
    uno: null,
    dos: null
  })

  const handleDocumentRequest = value => {
    if (!value.message || !value.typeDocument || !value.typeID || !proofs.uno || !proofs.dos) {
      setMessage('Please fill all the fields')
    } else {
      setLoading(true);

      const objBody = {
        name: userInfo.name,
        typeOfDocument: value.typeDocument,
        typeOfID: value.typeID,
        message: value.message,
        contact: userInfo.phone,
        email: userInfo.email,
        proofOfID: {
          uno: proofs.uno.name,
          dos: proofs.dos.name
        }
      }
      
      postDocument(objBody)
        .then(data => {
          const pod1Ref = ref(storage, `pod/images/${data.document._id}/${data.document.proofOfID.uno}`);
          const pod1 = uploadBytesResumable(pod1Ref, proofs.uno);
  
          pod1
            .on("state_changed", snapshot => {
              
            }, (error) => {
              console.log(error);
            }, () => {
              setLoading(false);
              navigate('/');
            })

          const pod2Ref = ref(storage, `pod/images/${data.document._id}/${data.document.proofOfID.dos}`);
          const pod2 = uploadBytesResumable(pod2Ref, proofs.dos);
  
          pod1
            .on("state_changed", snapshot => {
              
            }, (error) => {
              console.log(error);
            }, () => {
              setLoading(false);
              navigate('/');
            })

          pod2
            .on("state_changed", snapshot => {
              
            }, (error) => {
              console.log(error);
            }, () => {
              setLoading(false);
              navigate('/');
            })
        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        })
    }
  }

  const changeProof1 = e => {
    setProofs({
      ...proofs,
      uno: e.target.files[0]
    })
  }
  
  const changeProof2 = e => {
    setProofs({
      ...proofs,
      dos: e.target.files[0]
    })
  }

  return(
    loading || !userInfo ?
    <LoadingEffect />
    :
    <>
      <div className="w-full mx-auto px-3" style={{
        maxWidth: "600px"
      }}>
        <div className="shadow p-5 my-5 bg-white mb-20">
          <h1 className="text-gray-700 font-semibold text-subheading m-0 leading-tight">
            Request Document Form
          </h1>

          {
            message ?
              <p className="text-red-500 m-0 text-center mt-5">
                { message }
              </p>          
            :
            ""
          }

          <hr className="my-5" />

          <p className="text-gray-700 text-caption mb-2 mt-5">
            Type of Document
          </p>
          <Form
            onFinish={ handleDocumentRequest }
          >
            <Form.Item
              name="typeDocument"
            >
              <Select 
                value="barangayClearance"
                className='w-full'
                placeholder='Choose document'
              >
                <Option value="barangay certificate">Barangay Certificate</Option>
                <Option value="certificate of residency">Certificate of Residency</Option>
                <Option value="barangay clearance">Barangay Clearance</Option>
                <Option value="barangay ID">Barangay ID</Option>
                <Option value="certificate of indigency">Certificate of Indegency</Option>
                <Option value="voters list">Voters List</Option>
                <Option value="business permit">Business Permit</Option>
                <Option value="first time job seeker certificate">1st Time Job Seeker Certificate</Option>
              </Select>
            </Form.Item>

            <p className="text-gray-700 mt-5">
              Purpose
            </p>
            <Form.Item
              name="message"
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} placeholder='Purpose of document'/>
            </Form.Item>

            <p className="text-gray-700 text-caption mb-2 mt-5">
              Type of ID you have
            </p>
            <Form.Item
              name="typeID"
            >
              <Select 
                className='w-full'
                placeholder='Choose ID'
              >
                <Option value="company id">Company ID</Option>
                <Option value="umid">E-Card / UMID</Option>
                <Option value="drivers license">Driver's License</Option>
                <Option value="prc id">PRC ID</Option>
                <Option value="passport id">Passport ID</Option>
                <Option value="sss id">SSS ID</Option>
                <Option value="voters id">Voter's ID</Option>
                <Option value="philsys id">PhilSys ID</Option>
                <Option value="nbi clearance">NBI Clearance</Option>
                <Option value="ibp id">IBP ID</Option>
                <Option value="firearms license">Firearms License</Option>
                <Option value="afpslai id">AFPSLAI ID</Option>
                <Option value="pvao id">PVAO ID</Option>
                <Option value="afp beneficiary id">AFP ID</Option>
                <Option value="pag-ibig id">Pagibig ID</Option>
                <Option value="pwd id">PWD ID</Option>
                <Option value="solo parent id">Solo Parent ID</Option>
                <Option value="4p's id">4P's ID</Option>
                <Option value="barangay id">Barangay ID</Option>
                <Option value="phil-health id">PhilHealth ID</Option>
                <Option value="school id">School ID</Option>
                <Option value="police id">Police ID</Option>
              </Select>
            </Form.Item>

            <p className="text-gray-700 text-caption mt-5">
              Front ID
            </p>
            <Form.Item>
              <input 
                type="file" 
                className='w-full'
                accept="image/png, image/svg, image/jpg, image/jpeg"
                onChange={ changeProof1 }
                />
            </Form.Item>

            <p className="text-gray-700 text-caption ">
              Back ID
            </p>
            <Form.Item>
              <input 
                type="file" 
                className='w-full'
                accept="image/png, image/svg, image/jpg, image/jpeg"
                onChange={ changeProof2 }
              />
            </Form.Item>

            <Form.Item>
              <button 
                type="submit"
                className='bg-blue-500 text-white px-4 py-1.5 text-caption rounded font-semibold hover:bg-blue-400 duration-200'
              >
                Submit Request 
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Footer />
    </>
  )
}

const postDocument = async objectBody => {
  const result = await fetch('/document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objectBody)
  })

  const data = await result.json();
  return data;
}

export default Document;