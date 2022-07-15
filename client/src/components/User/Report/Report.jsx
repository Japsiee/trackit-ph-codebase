import { Form, Button, Input, Progress, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingEffect from '../../Unauthorized/LoadingEffect'
import { UserInfoContext } from '../../../contexts/UserInfoContext';

import { storage } from '../../../firebase/index'
import { ref, uploadBytesResumable } from '@firebase/storage'

import Footer from '../Footer/Footer';

const Report = () => {
  const [message, setMessage] = useState('');
  const { userInfo, loading, setLoading } = useContext(UserInfoContext)
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleDocumentRequest = value => {
    if (!value.reportDescription || !value.reportLocation || !selectedFile ) {
      setMessage('Please we need an information about the incident');
    } else {
      setLoading(true);

      if (selectedFile) {
        const objBody = {
          name: userInfo.name,
          subject: value.reportTitle,
          detail: value.reportDescription,          
          contact: userInfo.phone,
          location: value.reportLocation,
          email: userInfo.email,
          emergencyNeeds: value.reportNeeds,
          proofOfIncident: selectedFile.name
        }

        postIncident(objBody)
          .then(data => {
            const poiRef = ref(storage, `poi/images/${data.incident._id}/${data.incident.proofOfIncident}`);
            const poi = uploadBytesResumable(poiRef, selectedFile);
    
            poi
              .on("state_changed", snapshot => {
                
              }, (error) => {
                console.log(error);
              }, () => {
                setLoading(false);
                navigate('/');
              })
            })
          .catch(err => {
            console.log(err);
            setLoading(false);
          })
          
      } else {
        const objBody = {
          name: userInfo.name,
          subject: value.reportTitle,
          detail: value.reportInformation,          
          contact: userInfo.phone,
          location: value.reportLocation,
          email: userInfo.email,
          emergencyNeeds: value.reportNeeds,
          proofOfIncident: ''
        }

        postIncident(objBody)
          .then(() => {
            setLoading(false);
            navigate('/')         
          })
          .catch(err => {
            console.log(err)
            setLoading(false);
          })
      }      
    }
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
            Incident Form
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
            Subject of Incident
          </p>
          <Form
            onFinish={ handleDocumentRequest }
          >
            <Form.Item
              name="reportTitle"
            >
              <Input placeholder='Incident subject' />
            </Form.Item>

            <p className="text-gray-700 text-caption mb-2 mt-5">
              Incident Information
            </p>
            <Form.Item
              name="reportDescription"
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} placeholder='Description'/>
            </Form.Item>

            <p className="text-gray-700 text-caption mb-2 mt-5">
              Emergency Needs
            </p>

            <Form.List name="reportNeeds">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'item']}
                        rules={[{ required: true, message: 'Missing field' }]}
                      >
                        <Input placeholder="ex. Flashlight/Ambulance" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Needs
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <p className="text-gray-700 text-caption mb-2 mt-5">
              Incident's Location
            </p>
            <Form.Item
              name="reportLocation"
            >
              <Input placeholder='Location' />
            </Form.Item>

            <p className="text-gray-700 text-caption mb-2">
              { "Supporting image for the incident (Optional)" }
            </p>
            <Form.Item>
              <input 
                type="file" 
                className='w-full'
                onChange={ e => setSelectedFile(e.target.files[0]) }
                accept="image/png, image/svg, image/jpg, image/jpeg"
              />
              <Progress percent={ 0 } />
            </Form.Item>

            <Form.Item>
              <button 
                type="submit"
                className='bg-blue-500 text-white px-4 py-1.5 text-caption rounded font-semibold hover:bg-blue-400 duration-200'
              >
                Submit Report
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Footer />
    </>
  )
}

const postIncident = async objectBody => {
  const result = await fetch('/incident', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objectBody)
  })

  const data = await result.json();
  return data;
}

export default Report;