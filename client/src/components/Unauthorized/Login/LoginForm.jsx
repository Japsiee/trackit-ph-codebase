import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom'
import TrackitLogo from '../../../assets/images/logos/trackitph.png'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';

// firebase signin auth
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const auth = getAuth();
  const { userDispatch } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = value => {
    setLoading(true)
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((userCredential) => {
        readClient(userCredential.user.email)
          .then(userInfo => {
            const user = {
              ...userCredential.user,
              role: userInfo.data.attr.role
            }

            if (user.emailVerified) {
              userDispatch({ type: 'VERIFIED_EMAIL', payload: user })
              setLoading(false);
            } else {
              userDispatch({ type: 'UNVERIFIED_EMAIL', payload: user })
              setLoading(false);
            }
          })
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;

        if (errorMessage.includes('(auth/wrong-password)')) {
          setMessage('Invalid email / password. Please try again')
        }

        if (errorMessage.includes('(auth/user-not-found)')) {
          setMessage('Your email is not yet registered. Please signup')
        }

        if (errorMessage.includes('temporarily disabled')) {
          setMessage('Your account is temporarily disabled due to many attempts')
        }

        console.log(errorMessage)
        setLoading(false);
      });
  }

  const warningStyle = {
    marginBottom: "10px",
    background: "#ffe4e6",
    border: "1px solid #e11d48"
  }

  return (
    <>
      {
        message ?
          <div
            className='flex items-center p-3 rounded text-red-500 '
            style={warningStyle}
          >
            <span className='font-semibold'>
              {message}
            </span>
          </div>
          :
          ""
      }
      <Form
        name="register"
        onFinish={handleLogin}
        className="flex flex-col justify-center items-center text-center"
      >
        <div className='w-full'>

          <div className='flex items-center justify-center text-center py-5'>
            <img src={TrackitLogo} alt="trackit-ph" className="TrackITLogo" />
          </div>

          <h1 className="text-body text-gray-700 font-bold mb-4">
            Login to your account
          </h1>

          <Form.Item style={{ lineHeight: 0, margin: "0 0 10px 0" }}
            name="email"
            className='w-full'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Input email address" disabled={loading} />
          </Form.Item>
          <Form.Item style={{ lineHeight: 0, margin: "0 0 10px 0" }}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >

            <Input.Password
              placeholder="Input password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              disabled={loading}
            />
          </Form.Item>

          <div className='py-2 text-caption'>
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <Form.Item style={{ lineHeight: 0, margin: 0 }}>
            {
              loading ?
                <Button type="default" htmlType="submit" loading>
                  Logging in...
                </Button>
                :
                <button
                  type="submit"
                  className='bg-blue-500 text-white px-7 py-4 text-caption rounded font-medium hover:bg-blue-400 duration-200'
                >
                  Login
                </button>
            }
          </Form.Item>
        </div>
      </Form>

    </>
  )
}

const readClient = async clientEmail => {
  const response = await fetch(`/client/${clientEmail}`);
  const data = await response.json();
  return data;
}

export default LoginForm
