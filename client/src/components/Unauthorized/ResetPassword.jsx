import React, { useEffect, useState } from 'react'
import { Form, Input, notification } from 'antd';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons'
import validator from 'validator'

// Firebase

import { auth } from '../../firebase';
import { confirmPasswordReset } from 'firebase/auth';

const ResetPassword = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [password, setPassword] = useState("")
  const [validating, setValidating] = useState(false)
  const [error, setError] = useState("")
  
  function useQuery() {
    const location = useLocation()
    return new URLSearchParams(location.search)
  }

  function resetPassword(oobCode, password) {
    return confirmPasswordReset(auth, oobCode, password)
  }

  const query = useQuery()

  const validatePass = (e) => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    if (validator.isStrongPassword(password, {
      minLength: 5, minLowercase: 1,
      minUppercase: 1, minNumbers: 2, minSymbols: 1
    })) {
      setError("ok")
    } else {
      setError("err")
    }

    if (password === "") {
      setError("")
    }
  }, [password])


  const submit = async values => {
    setValidating(true)
    resetPassword(query.get('oobCode'), password)
    .then(res => {console.log(res)
        setValidating(false)
        notification.open({
            icon: <> <SmileOutlined  className='mt-5 text-green-500'/>   </>,
            message:  <> <p className='text-green-500'> Password Accepted </p> </>,
            duration: 10,
            description:
            'You have changed your password successfully',
        })
        navigate('/')
        
    })
    .catch(err => {
        console.log(err.message)
        notification.open({
            icon: <> <SmileOutlined  className='mt-5 text-green-500'/>   </>,
            message:  <> <p className='text-green-500'> Something went wrong!  </p> </>,
            duration: 10,
            description:
            'Please try again!',
        })
    })

  }

  return (
    <div className='flex my-auto h-screen justify-center items-center text-start'>
      <div className='bg-gray-100 w-4/12 rounded-lg shadow-lg px-10 pt-16 pb-5'>
        <Form
          name="basic"
          form={form}
          initialValues={false}
          autoComplete="on"
          preserve={false}
          onFinish={submit}
        >
          <div className='flex justify-center items-center text-center'>
            <p className='font-bold text-xl md:text-2xl pb-10'>Reset Password</p>
          </div>

          <p className='text-[#999897] font-medium text-md pb-3'> Password </p>
          <Form.Item name="Email">
            <Input
              className='w-full'
              minLength={6}
              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              onChange={validatePass}
              disabled={validating}
            />
            {error === 'err' ?
              <>
                <p className='text-red-500 pt-2'>
                  Password should contain atleast <br />
                  <b>
                    <ul className='pt-3'>
                      <li> - 6 characters </li>
                      <li> - 1 lowercase  </li>
                      <li> - 1 uppercase </li>
                      <li> - 2 numbers </li>
                      <li> - 1 symbol </li>
                    </ul>
                  </b>
                </p>
              </>
              :
              error === 'ok' ?
                <p className='flex justify-center text-center items-center text-green-500 pt-2'> Good Password </p>
                :
                ""
            }
          </Form.Item>

          <div className={'flex justify-around pt-6' }>
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
                disabled={error === 'err' || error === ""}
                className={
                  error === 'err' || error === "" ?
                    'rounded-full bg-blue-300 opacity-50 text-md text-white px-5 py-2 cursor-not-allowed'
                    :
                    validating ?
                      'rounded-full bg-blue-400 opacity-50 text-md text-white px-5 py-2'
                      :
                      'rounded-full bg-blue-500 hover:bg-blue-400 text-md text-white px-5 py-2'
                }>
                {validating ?
                  'Resetting ... '
                  :
                  'Reset Password'
                }
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ResetPassword