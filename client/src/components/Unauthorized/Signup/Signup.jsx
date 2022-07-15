import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Select, Steps, Space, Progress, Modal, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// firebase imports
import { storage } from '../../../firebase/index'
import { ref, uploadBytesResumable } from '@firebase/storage'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

const { Option } = Select;
const { Step } = Steps;

const generatePassword = () => uuidv4().slice(0,7);

const Signup = () => {  
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState(null);
  const [bd, setBd] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState({
    front: null,
    back: null
  })
  const [load, setLoad] = useState({
    frontImage: 0,
    backImage: 0
  })

  const confirmSuccess = () => {
    navigate('/');
  };

  const auth = getAuth();

  const onStep0 = (values) => {
    const psswrd = generatePassword();

    setInfo({
      email: values.email,
      attr: {
        name: values.fullname,
        address: values.address,
        birthdate: bd || null,
        phone: values.phone,
        gender: values.gender,
        password: psswrd,
        role: 'user'
      },
      proofOfResidency: {
        image: {
          front: null,
          back: null
        }
      }
    })

    setStep(1);
  };

  const onStep1 = (values) => {    
    const newInfo = {
      ...info,
      categ: {
        pwd: values.pwd,
        fourps: values.fourps
      },
      pets: values.pets || null
    }
    
    setInfo(newInfo);
    setStep(2);
  };

  const onStep2 = async value => {
    try {
      if (!image.front || !image.back) {
        console.log('please attach an image');
      } else {       
        setUploading(true);

        const newInfo = {
          ...info,
          proofOfResidency: {
            ...info.proofOfResidency,
            typeOfID: value.id
          }
        }

        setInfo(newInfo);

        const newlyCreatedUser = await createUserWithEmailAndPassword(auth, info.email, info.attr.password);

        if (newlyCreatedUser) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log('verification email is sent');
            })

            const data = await fetch('/client', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(info)
            })
    
            const res = await data.json()
            
            if (res) {
              const imageFrontRef = ref(storage, `por/images/${res.data._id}/${image.front.name}`);
              const uploadFrontTask = uploadBytesResumable(imageFrontRef, image.front);
    
              uploadFrontTask
                .on("state_changed", snapshot => {
                  let load = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                  setLoad(prev => ({
                    ...prev,
                    frontImage: load
                  }))
                }, (error) => {
                  console.log(error);
                },                      
                () => {
                  if (load.frontImage === 100 && load.backImage === 100) {
                    setIsModalVisible(true);
                  }
                })
                
              const imageBackRef = ref(storage, `por/images/${res.data._id}/${image.back.name}`);
              const uploadBackTask = uploadBytesResumable(imageBackRef, image.back);
              
              uploadBackTask
              .on("state_changed", snapshot => {
                let load = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    
                setLoad(prev => ({
                  ...prev,
                  backImage: load
                }))
              }, (error) => {
                console.log(error);
              },          
              () => {
                if (load.frontImage === 100 && load.backImage === 100) {
                  setIsModalVisible(true);
                }
              })
          }
        }
      }
      
      setIsModalVisible(true);
      setUploading(false);
    } catch(error) {
      console.log(error)
      if (error.toString().includes('FirebaseError: Firebase: Error (auth/email-already-in-use)')) {
        message.error('This email is already registered. Please wait for the mail that will be sent to you after verifying your account.')
      } else if (error.toString().includes('Firebase: Error (auth/email-already-in-use)')) {
        alert('Email exist please try different email.')
      } else {
        alert('Something went wrong please try again')
        console.log(error)        
      }
      setUploading(false);
    }
  };  

  const selectFrontID = e => {
    setImage({
      ...image,
      front: e.target.files[0]
    })

    setInfo({
      ...info,
      proofOfResidency: {
        ...info.proofOfResidency,
        image: {
          ...info.proofOfResidency.image,
          front: "por/images/" + e.target.files[0].name
        }
      }
    })
  }
  
  const selectBackID = e => {
    setImage({
      ...image,
      back: e.target.files[0]
    })

    setInfo({
      ...info,
      proofOfResidency: {
        ...info.proofOfResidency,
        image: {
          ...info.proofOfResidency.image,
          back: "por/images/" + e.target.files[0].name
        }
      }
    })
  }

  function pickDate(date, dateString) {
    setBd(dateString)
  }

  const currentDate = (current) => {
    let customDate = moment();
    return current && current > moment(customDate);
    }
  

  const backBtnFunc = () => {
    if (step === 0) {
      navigate('/');
    } else {
      setStep(step - 1);
    }
  }

  return (
    <div className='p-0 md:px-10'>
      <Modal 
        visible={isModalVisible} 
        footer={ false }
        closable={ false }
        maskClosable={ false }
        centered
      >
        <h1 className="text-gray-700 font-normal">
          <span className="text-green-500 font-semibold block mb-5">Successfully registered!</span> 
          Please allow 3-5 days for the process to complete; administrators are currently reviewing your information. If you are authorized, you will receive an email.
        </h1>

        <p className="text-gray-700 font-normal my-5">
          Please also confirm your account by clicking the link we emailed to you. Check your mail spam or trash if nothing appears in your inbox 
        </p>
        <button
          className='bg-blue-500 text-white px-4 py-2 text-caption mt-2 rounded font-medium hover:bg-blue-400 duration-200'
          onClick={ confirmSuccess }
        >
          Yes, I undestand.
        </button>
      </Modal>
      <div className="mx-auto p-5 shadow bg-white rounded md:my-10" style={{
        width: "600px",
        maxWidth: "100%"
      }}>

        <button 
          className='flex items-center text-gray-500 font-semibold text-caption md:text-body'
          onClick={ backBtnFunc }
        >
          <i className="bi bi-arrow-left-short"></i>
          &nbsp;
          <span className='text-caption'>
            Go back
          </span>
        </button>

        <h1 className="text-body md:text-heading font-semibold text-center text-blue-500 my-5">
          {
            step === 0 ?
            "Create account"
            :
            step === 1 ?
            "Additional information"
            :
            "Verifying identity"
          }          
        </h1>
                
        <Steps progressDot current={ step } direction="horizontal">
          <Step 
            title="Step 1" 
            description="Fill up personal information"
          />
          <Step 
            title="Step 2" 
            description="Additional information"
          />
          <Step 
            title="Step 3" 
            description="Verification of identity"
          />
        </Steps>

        <hr className="my-5 md:my-10" />

        <Form
          name="signup"
          initialValues={{ remember: true }}
          autoComplete="off"          
          onFinish={
            step === 0 ?
              onStep0
            :
            step === 1 ?
              onStep1
            :
              onStep2
          }
        >
          {
            step === 0 ?
            <>
              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Full name
              </p>
              <Form.Item
                name="fullname"
                rules={[{ required: true, message: 'Please input your fullname!' }]}            
              >
                <Input placeholder='John Doe' />
              </Form.Item>              

              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Address
              </p>
              <Form.Item
                name="address"            
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input.TextArea placeholder='Address' autoSize={{ minRows: 2, maxRows: 2 }} />
              </Form.Item>

              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Phone number
              </p>
              <Form.Item
                name="phone"            
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input placeholder='09xx-xxx-xxxx' />
              </Form.Item>

              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Birthdate
              </p>
              <Form.Item
                name="birthdate"  
                rules={[{ required: true, message: 'Please input your birthday!' }]}         
              >
                <DatePicker onChange={ pickDate } disabledDate={currentDate}/>
              </Form.Item>

              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Gender
              </p>
              <Form.Item
                name="gender"
                rules={[{ required: true, message: 'Please select gender!' }]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="none">I do not want to specify</Option>
                </Select>
              </Form.Item>
            </>
            :

            step === 1 ?      
            <>
              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Are you a PWD? {"( Person with a disability )"}
              </p>
              <Form.Item
                name="pwd"
                rules={[{ required: true, message: 'Please input if pwd or not' }]}            
              >
                <Select placeholder="PWD or not">
                  <Option value={ true }>YES</Option>
                  <Option value={ false }>NO</Option>
                </Select>
              </Form.Item>

              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Are you a 4P's?
              </p>
              <Form.Item
                name="fourps"
                rules={[{ required: true, message: 'Please input if 4p\'s or not' }]}            
              >
                <Select placeholder="4p's or not">
                  <Option value={ true }>YES</Option>
                  <Option value={ false }>NO</Option>
                </Select>
              </Form.Item>

              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Pets
              </p>
              <Form.List name="pets">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'type']}
                          rules={[{ required: true, message: 'Missing pet type' }]}
                        >
                          <Select placeholder="Type of Pet" style={{ width: '200px' }} disabled={ uploading }>
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
                          rules={[{ required: true, message: 'Missing pet quantity' }]}
                        >
                          <Input placeholder="Pet Quantity" />
                        </Form.Item>
                        <button
                          onClick={ () => remove(name) }
                        >
                          Remove
                        </button>
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </>
            :            
            <>
              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Email address
              </p>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input placeholder='johndoe123@gmail.com' onChange={ e => setInfo({ ...info, email: e.target.value }) } disabled={ uploading } />
              </Form.Item>
              
              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Type of ID
              </p>
              <Form.Item
                name="id"
                rules={[{ required: true, message: 'Please input ID!' }]}                
              >
                <Select placeholder="type of ID" disabled={ uploading }>
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

              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Image of front ID
              </p>
              <input 
                type="file" 
                onChange={ selectFrontID } 
                accept="image/png, image/svg, image/jpg, image/jpeg"
                disabled={ uploading }
              />
              <Progress percent={ load.frontImage } />

              <p 
                className="text-gray-700 font-medium py-2 m-0"
              >
                Image of back ID
              </p>
              <input 
                type="file" 
                onChange={ selectBackID } 
                accept="image/png, image/svg, image/jpg, image/jpeg"
                disabled={ uploading }
              />
              <Progress percent={ load.backImage } />
            </>
          }

          <Form.Item>
            {
              step === 0 ?              
              <button 
                type="submit"
                onSubmit={ onStep0 }
                className='bg-blue-500 text-white px-4 py-2 text-caption mt-2 rounded font-medium hover:bg-blue-400 duration-200'
              >
                Continue to step 2
              </button>
              :
              step === 1 ?
              <>
                <button 
                  type="submit"
                  onSubmit={ onStep1 }
                  className='bg-blue-500 text-white px-4 py-2 text-caption mt-2 rounded font-medium hover:bg-blue-400 duration-200'
                >
                  Continue to step 3
                </button>
              </>
              :              
              <>         
                <button 
                  type="submit"
                  onSubmit={ onStep1 }
                  className='bg-blue-500 text-white px-4 py-2 text-caption mt-2 rounded font-medium hover:bg-blue-400 duration-200'
                  disabled={ uploading }                             
                >
                  Submit Documents
                </button>
              </>
            }
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Signup
