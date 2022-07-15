import { useContext, useState } from 'react';
import { Form, Input, Progress } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../../../contexts/UserInfoContext';
import Footer from '../Footer/Footer';

import LoadingEffect from '../../Unauthorized/LoadingEffect'

import { storage } from '../../../firebase/index'
import { ref, uploadBytesResumable } from '@firebase/storage'

const Complaints = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [fileSelected, setFileSelected] = useState('');
  const [load, setLoad] = useState(0)
  const { userInfo, loading, setLoading } = useContext(UserInfoContext)

  const handleDocumentRequest = value => {
    // console.log(userInfo)

    if (!value.complaintTitle || !value.complaintLocation || !value.complaintName || !value.complaintDescription) {
      setMessage('Fill all fields')
    } else {
      setLoading(true);

      if (fileSelected) {
        const objectBody = {
          name: userInfo.name,
          subject: value.complaintTitle,
          detail: value.complaintDescription,
          contact: userInfo.phone,
          email: userInfo.email,
          complaineeName: value.complaintName,
          complaineeLocation: value.complaintLocation,
          proofOfComplaint: fileSelected.name
        }
        
        postComplaint(objectBody)
          .then(data => {         
            console.log(data);
            const pocRef = ref(storage, `poc/images/${data.complaint._id}/${data.complaint.proofOfComplaint}`);
            const poc = uploadBytesResumable(pocRef, fileSelected);
  
            poc
              .on("state_changed", snapshot => {
                let loads = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setLoad(loads)
              }, (error) => {
                console.log(error);
              }, () => {
                setLoading(false);
                navigate('/');
              })
            })
          .catch(err => {
            console.log(err);
            setLoading(false)
          })
        } else {
          const objectBody = {
            name: userInfo.name,
            subject: value.complaintTitle,
            detail: value.complaintDescription,
            contact: userInfo.phone,
            email: userInfo.email,
            complaineeName: value.complaintName,
            complaineeLocation: value.complaintLocation,
            proofOfComplaint: ""
          }

          postComplaint(objectBody)
            .then(data => {   
              setLoading(false)
              navigate('/');
            })
            .catch(err => {
              console.log(err);
              setLoading(false)
            })
      }

    }
  }

  const changeFile = e => {
    setFileSelected(e.target.files[0]);
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
            Complainant Form
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

          <p className="text-gray-700 text-caption mt-5 mb-2">
            Subject of Complaint
          </p>
          <Form
            onFinish={ handleDocumentRequest }
          >
            <Form.Item
              name="complaintTitle"
            >
              <Input placeholder='Complaint subject' />
            </Form.Item>

            <p className="text-gray-700 text-caption mb-2 mt-5">
              Description
            </p>
            <Form.Item
              name="complaintDescription"
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} placeholder='Description'/>
            </Form.Item>

            <p className="text-gray-700 text-caption mt-5 mb-2">
              Complainee's Name
            </p>
            <Form.Item
              name="complaintName"
            >
              <Input placeholder='Name of the person who you want to complain' />
            </Form.Item>

            <p className="text-gray-700 text-caption mb-2 mt-5">
              Complainee's Location
            </p>
            <Form.Item
              name="complaintLocation"
            >
              <Input placeholder='Location' />
            </Form.Item>

            <p className="text-gray-700 text-caption mb-2 mt-5">
              Supporting image for your complain
            </p>
            <Form.Item>
              <input 
                type="file" 
                className='w-full'
                onChange={ changeFile }
                accept="image/png, image/svg, image/jpg, image/jpeg"
              />
              <Progress percent={ load } />
            </Form.Item>

            <Form.Item>
              <button 
                type="submit"
                className='bg-blue-500 text-white px-3 py-1.5 text-caption rounded font-medium hover:bg-blue-400 duration-200'
              >
                Submit Complaint
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Footer />
    </>
  )
}

const postComplaint = async objectBody => {
  const result = await fetch('/complaint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objectBody)
  })

  const data = await result.json();
  return data;
}

export default Complaints;