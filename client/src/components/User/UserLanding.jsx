import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { UserInfoContext } from "../../contexts/UserInfoContext";

import { getAuth, signOut } from "firebase/auth";

import LoadingEffect from '../Unauthorized/LoadingEffect'

import Navbar from './Navbar/Navbar';

const UserLanding = ({ elem }) => {
  const auth = getAuth();
  const { userState, userDispatch } = useContext(UserContext);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { loading } = useContext(UserInfoContext);
  const [access, setAccess] = useState(false);

  const handleLogout = () => {
    signOut(auth).then(() => {
      userDispatch({ type: 'LOGOUT' })    
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    if (userState) {
      readClient(userState.email)
        .then(data => {
          if (data.data.approved) {
            setAccess(true)
            const info = {
              _id: data.data._id,
              name: data.data.attr.name,
              email: data.data.email,
              qrCode: data.data.qrCode,
              address: data.data.attr.address,
              pets: data.data.pets,
              phone: data.data.attr.phone,
              gender: data.data.attr.gender,
              birthdate: data.data.attr.birthdate,
              categ: {
                pwd: data.data.categ.pwd,
                fourps: data.data.categ.fourps
              }
            }
            setUserInfo(info);
          } else {
            setAccess(false)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
    // if (userState.emailVerified) {
    //   setAccess(true);
    // } else {
    //   setAccess(false);
    // }    
    // setAccess(true)
    // eslint-disable-next-line
  }, [userState])

  useEffect(() => {
    if (!userInfo) {
      readClient(userState.email)
        .then(data => {
          const info = {
            _id: data.data._id,
            name: data.data.attr.name,
            email: data.data.email,
            qrCode: data.data.qrCode,
            address: data.data.attr.address,
            pets: data.data.pets,
            phone: data.data.attr.phone,
            gender: data.data.attr.gender,
            birthdate: data.data.attr.birthdate,
            categ: {
              pwd: data.data.categ.pwd,
              fourps: data.data.categ.fourps
            }
          }
          setUserInfo(info);
        })
        .catch(error => {
          console.log(error)
        })
      }    
    // eslint-disable-next-line
  }, [userState])

  return (
    loading ?
    <LoadingEffect />
    :    
    userState ?
      <>
        {
          access ?
            <>
              <Navbar />
              { elem }
            </>
          :
          <>
            <div className="flex justify-center items-center h-screen w-screen">
              <div className="round bg-white p-5 shadow">
                <h1 className="text-center font-medium text-red-400 text-subbody mb-2">
                  Your account is not yet verified please check your mails
                </h1>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    onClick={ handleLogout }
                    className='bg-red-400 text-white p-2 text-caption rounded font-medium hover:bg-red-500 duration-200'
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      </>
    :
    ""
  )
}

const readClient = async clientEmail => {
  const response = await fetch(`/client/${clientEmail}`);
  const data = await response.json();
  return data;
}

export default UserLanding
