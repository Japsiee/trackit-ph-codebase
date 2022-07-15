import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Space, Modal, Menu, Dropdown, Tooltip } from 'antd';
import TrackITLogo from '../../../assets/images/logos/trackitph.png';
import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';

import { UserInfoContext } from '../../../contexts/UserInfoContext';
import { UserContext } from '../../../contexts/UserContext';

import { getAuth, signOut } from "firebase/auth";

// const messageFetch = async endpoint => {
//   const response = await fetch(endpoint);
//   const data = response.json();
//   return data;
// }

const Navbar = () => {
  const auth = getAuth();
  const [visible, setVisible] = useState(false);
  // const [date, setDate] = useState(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  // const [message, setMessage] = useState(null);
  const { userDispatch } = useContext(UserContext);
  const { userInfo } = useContext(UserInfoContext);

  const showDrawer = () => {
    setVisible(true);
  };

  const [active, setActive] = useState('dashboard');

  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      userDispatch({ type: 'LOGOUT' })
      window.location.href = "/"
    }).catch((error) => {
      console.log(error)
    });
  }

  const popLogout = () => {
    setLogoutConfirm(true);
  }

  const popLogoutClose = () => {
    setLogoutConfirm(false);
  }

  // const convertDateToReadable = dateString => {
  //   let resp;

  //   const splitted0 = dateString.split('-');
  //   const splitted1 = date.split('-');

  //   if (dateString === date) {
  //     resp = "today";
  //   } else {
  //     // if same year
  //     if (splitted0[0] === splitted1[0]) {
  //       // if same month
  //       if (splitted0[1] === splitted1[1]) {
  //         // if same day
  //         if (splitted0[2] === splitted1[2]) {

  //         } else {
  //           const d = parseInt(splitted0[2]) - 30
  //           const dy = parseInt(d.toString().replace('-', ''))

  //           resp = dy > 1 ? dy + ' days ago' : dy + ' day ago';
  //         }
  //       } else {
  //         const m = parseInt(splitted0[1]) - 12
  //         const mt = parseInt(m.toString().replace('-', ''))

  //         resp = mt > 1 ? mt + ' months ago' : mt + ' month ago';
  //       }
  //     } else {
  //       const yr = parseInt(splitted1[0]) - parseInt(splitted0[0])
  //       resp = yr > 1 ? yr + ' years ago' : yr + ' year ago';
  //     }
  //   }

  //   return resp;
  // }

  // useEffect(() => {
  //   const date = new Date().toString();
  //   const splitted = date.slice(0,15).split(' ');
  //   const month = monthConvert(splitted[1])
  //   const day = splitted[2];
  //   const year = splitted[3];
  //   const newDate = `${ year }-${ month }-${ day }`
  //   setDate(newDate);

  //   messageFetch('/messages')
  //     .then(data => {
  //       setMessage(data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, [])

  // const notifications = (
  //   <Menu>
  //     <Menu.Item key="0">
  //       <a href="https://www.antgroup.com">1st menu item</a>
  //     </Menu.Item>
  //     <Menu.Item key="1">
  //       <a href="https://www.aliyun.com">2nd menu item</a>
  //     </Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item key="3">3rd menu item</Menu.Item>
  //   </Menu>
  // );

  // const messages = (
  //   <Menu style={{ margin: "10px -70px 0 0", padding: 0, lineHeight: 0, width: "250px" }}>
  //     {
  //       message ?
  //       message.map(m => (
  //         <React.Fragment key={ m.id }>
  //           <Menu.Item key={ m.id } onClick={ () => console.log(m.id) }>
  //             <div className="flex justify-start items-center text-base">
  //               <Avatar src={ TrackITLogo } size="large" />
  //               <div className='ml-3 w-full'>
  //                 <div className="flex justify-between items-center">
  //                   <p className="font-semibold m-0">
  //                     {
  //                       nameTruncator(m.name)
  //                     }        
  //                   </p>
  //                   <p className="text-xs m-0">
  //                     {
  //                       convertDateToReadable(m.date)
  //                     }
  //                   </p>
  //                 </div>
  //                 <p className="font-normal m-0">
  //                   {
  //                     messageTruncator(m.message)
  //                   }            
  //                 </p>
  //               </div>
  //             </div>
  //           </Menu.Item>
  //           <Menu.Divider style={{ margin: 0 }} />
  //         </React.Fragment>
  //       ))
  //       :
  //       <Menu.Item key={ 'no item' } className='bg-blue-200'>
  //         <div className="flex justify-center items-center">
  //           <h1 className="font-semibold text-lg m-0">
  //             No Messages
  //           </h1>
  //         </div>
  //       </Menu.Item>
  //     }
  //     {
  //       message ?
  //       <Menu.Item key={ 'view more' } className='bg-blue-200'>
  //         <div className="flex justify-center items-center">
  //           <h1 className="font-semibold text-lg m-0">
  //             View more
  //           </h1>
  //         </div>
  //       </Menu.Item>
  //       :
  //       ""
  //     }
  //   </Menu>
  // );

  const profile = (
    <Menu style={{ margin: "10px 0 0 0", padding: 0, lineHeight: 0, width: "200px" }}>
      <Menu.Item key="1" className='bg-gray-700'>
        <div className='text-white hover:text-gray-700 duration-200'>
          <Link
            to="/profile"
            className='text-white hover:text-gray-700'
            onClick={() => {
              setActive('profile')
            }}
          >
            <div className="flex items-center justify-center">
              <i className="fas fa-user-circle text-7xl" />
            </div>
            <h1 className="capitalize text-center truncate first-line:leading-tight text-inherit mt-3">
              {userInfo ? nameTruncator(userInfo.name) : "Getting name..."}
            </h1>
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item key="2" className="flex items-center">
        <Link
          to="/profile"
          onClick={() => {
            setActive('profile')
          }}
        >
          <i className="far fa-file-alt" />
          &nbsp;
          &nbsp;
          <span>
            Edit Profile
          </span>
        </Link>
      </Menu.Item>
      <Menu.Divider style={{ margin: 0 }} />
      <Menu.Item key="3" onClick={popLogout}>
        <i className="fas fa-power-off" />
        &nbsp;
        &nbsp;
        <span>
          Logout
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Modal
        visible={logoutConfirm}
        closable={false}
        maskClosable={false}
        footer={false}
        width={350}
        centered
      >
        <h1 className="text-center font-semibold text-xl text-gray-700">
          Continue to Logout?
        </h1>
        <div className="flex items-center justify-center mt-5">
          <Space>

            <button
              type="button"
              onClick={handleLogout}
              className='bg-blue-500 hover:bg-blue-400 text-white px-7 py-3 text-xl rounded font-semibold flex items-center'
            >

              <CheckOutlined />
            </button>

            <button
              type="button"
              onClick={popLogoutClose}
              className='bg-red-500 hover:bg-red-400 text-white px-7 py-3 text-xl rounded font-semibold flex items-center'
            >
              <CloseOutlined />
            </button>
          </Space>
        </div>
      </Modal>

      <Drawer
        placement="left"
        visible={visible}
        closable={false}
        width={320}
      >
        <div className="flex justify-center">
          <Link
            to="/"
            onClick={() => {
              onClose()
              setActive('')
            }
            }
          >
            <div
              className="shadow inline-block p-5 w-32"
              style={{
                borderRadius: "50%"
              }}
            >
              <img src={TrackITLogo} alt="track it" className='object-cover' />
            </div>
          </Link>
        </div>

        <div>
          <h1 className="capitalize text-body font-semibold text-gray-700 text-center mt-5 m-0 truncate">
            {userInfo ? userInfo.name : "Getting name..."}
          </h1>
          <p className="text-subbody text-center text-gray-500">
            Resident
          </p>
        </div>

        <div className="flex justify-center items-center mt-5">
          <Tooltip placement='bottom' className='flex items-center' title="Close Menu">
            <button
              className="rounded-full shadow font-bold text-2xl mr-2 md:mr-4 hover:bg-gray-100 duration-200 hover:text-gray-700"
              onClick={onClose}
            >
              <i className="fas fa-arrow-left hover:text-blue-500 p-2" />
            </button>
          </Tooltip>
          <Tooltip placement='bottom' className='flex items-center' title="Logout">
            <button
              className="rounded-full shadow font-bold text-2xl mr-2 md:mr-4 hover:bg-gray-100 duration-200 hover:text-gray-700"
              onClick={() => {
                popLogout();
                setVisible(false);
              }}
            >
              <i className="fas fa-power-off hover:text-blue-500 p-2" />
            </button>
          </Tooltip>
        </div>

        <div className="w-full mt-5">
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => {
                  onClose()
                  setActive('dashboard')
                }
                }
                className={active === 'dashboard' ?
                  'bg-blue-500 p-3 rounded text-white block hover:text-white'
                  :
                  'bg-white p-3 rounded text-gray-700 block'
                }>
                My QRCode
              </Link>
            </li>
            <li>
              <Link
                to="/complaints"
                onClick={() => {
                  onClose()
                  setActive('complaints')
                }
                }
                className={active === 'complaints' ?
                  'bg-blue-500 p-3 rounded text-white block hover:text-white'
                  :
                  'bg-white p-3 rounded text-gray-700 block'
                }>
                Complaint Report
              </Link>
            </li>
            <li>
              <Link
                to="/issuance-document"
                onClick={() => {
                  onClose()
                  setActive('document')
                }
                }
                className={active === 'document' ?
                  'bg-blue-500 p-3 rounded text-white block hover:text-white'
                  :
                  'bg-white p-3 rounded text-gray-700 block'
                }>
                Request Document
              </Link>
            </li>
            <li>
              <Link
                to="/incident-report"
                onClick={() => {
                  onClose()
                  setActive('report')
                }
                }
                className={active === 'report' ?
                  'bg-blue-500 p-3 rounded text-white block hover:text-white'
                  :
                  'bg-white p-3 rounded text-gray-700 block'
                }>
                Incident Report
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={() => {
                  onClose()
                  setActive('profile')
                }
                }
                className={active === 'profile' ?
                  'bg-blue-500 p-3 rounded text-white block hover:text-white'
                  :
                  'bg-white p-3 rounded text-gray-700 block'
                }>
                View Information
              </Link>
            </li>
          </ul>
        </div>

      </Drawer>
      <div className="flex justify-between items-center bg-blue-500 text-white p-3">
        <div className="flex text-subheading">
          <button
            type="primary"
            className='flex flex-row justify-center items-center text-center text-subbody'
            onClick={showDrawer}
          >
            <i className="fas fa-bars p-2" />
            <p>Menu</p>
          </button>
        </div>

        <div className="flex">
          <Space>
            {/* <Dropdown overlay={ messages }  trigger={['click']} disabled>
                <Tooltip title="Coming soon...">
                  <Link 
                    to=""
                    onClick={ e => e.preventDefault() }
                  >
                    <MessageOutlined className='text-3xl' />
                  </Link>
                </Tooltip>
              </Dropdown>
            
              <Dropdown overlay={ notifications } trigger={['click']} disabled>
                <Tooltip title="Coming soon...">
                  <Link 
                    to=""
                    onClick={ e => e.preventDefault() }
                  >
                    <BellOutlined className='text-3xl' />
                  </Link>
                </Tooltip>
              </Dropdown> */}

            <Dropdown className='flex items-center justify-center text-center mx-3' overlay={profile} trigger={['click']}>
              <Link
                to=""
                onClick={e => e.preventDefault()}
              >
                <UserOutlined className='text-subbody' />
                <p className='pl-2'>User Profile </p>
              </Link>
            </Dropdown>
          </Space>
        </div>
      </div>
    </>
  )
}


const nameTruncator = text => {
  return text.length >= 14 ? text.slice(0, 18) + " ..." : text;
}

// const monthConvert = string => {
//   let month;

//   switch(string) {
//     case 'Jan':
//       month = "01"
//     break;
//     case 'Feb':
//       month = "02"
//     break;
//     case 'Mar':
//       month = "03"
//     break;
//     case 'Apr':
//       month = "04"
//     break;
//     case 'May':
//       month = "05"
//     break;
//     case 'Jun':
//       month = "06"
//     break;
//     case 'Jul':
//       month = "07"
//     break;
//     case 'Aug':
//       month = "08"
//     break;
//     case 'Sept':
//       month = "09"
//     break;
//     case 'Oct':
//       month = "10"
//     break;
//     case 'Nov':
//       month = "11"
//     break;
//     case 'Dec':
//       month = "12"
//     break;
//     default:
//       month = "01"
//     break;
//   }

//   return month;
// }

export default Navbar;