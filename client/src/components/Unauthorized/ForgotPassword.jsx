import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Form, Input, notification } from 'antd';
import { NavLink } from 'react-router-dom';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons'

// Firebase 
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase';

const ForgotPassword = () => {

  const [form] = Form.useForm();
  const [email, setEmail] = useState("")
  const [validating, setValidating] = useState(false)
  const navigate = useNavigate()

  // Verify Email and Send Password 

  const forgotPassword = () => {
    setValidating(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setValidating(false);
        notification.open({
          icon: <> <SmileOutlined className='mt-5 text-green-500' />   </>,
          message: <> <p className='text-green-500'> Verification Sent</p> </>,
          duration: 5,
          description:
            'Please check your email (mostly on spam) and follow the link to change your password',
        })
        navigate('/');
      })
      .catch(() => {
        setValidating(false);
        notification.open({
          icon: <> <FrownOutlined className='mt-5 text-red-500' />   </>,
          message: <> <p className='text-red-500'>  Something went wrong! </p> </>,
          duration: 10,
          description:
            'Please make sure that you have entered your email correctly.',
        })
      })
  }

  return (
    <>
      <div className='flex my-auto h-screen justify-center items-center text-start'>
        <div className='bg-gray-100 w-4/12 rounded-lg shadow-lg px-10 pt-16 pb-5'>
          <Form
            name="basic"
            form={form}
            initialValues={false}
            autoComplete="on"
            preserve={false}
            onFinish={forgotPassword}
          >
            <div className='flex justify-center items-center text-center'>
              <p className='font-bold text-2xl pb-10'> Forgot Password</p>
            </div>

            <p className='text-[#999897] font-medium text-md pb-3'> Email Address</p>
            <Form.Item name="Email" rules={[{ required: true, message: 'Please input your Email!' }]}>
              <Input
                className='w-full'
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                onChange={(e) => { setEmail(e.target.value) }}
                disabled={validating}
              />
            </Form.Item>

            <div className='flex justify-around pt-6' >
              <Form.Item>
                <NavLink to="/" className='rounded-full text-blue-500 text-md px-6 py-2'
                  style={{
                    borderWidth: '0.5px',
                    borderColor: '#3b82f6'

                  }}>
                  Back
                </NavLink>
              </Form.Item>
              <Form.Item>
                <button type='submit'
                  disabled={validating}
                  className={
                    validating ?
                      'rounded-full bg-blue-500 opacity-50 text-md text-white px-5 py-2'
                      :
                      'rounded-full bg-blue-500 hover:bg-blue-400 text-md text-white px-5 py-2'
                  }>
                  {validating ?
                    'Submitting ... '
                    :
                    'Submit'
                  }
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword