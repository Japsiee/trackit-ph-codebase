import React from 'react'
import { Space, Modal, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom'
import { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { CheckOutlined, CloseOutlined, UserOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { getAuth, signOut } from "firebase/auth";

const AdminProfile = ({ userProfile }) => {
  const auth = getAuth();
  const { userDispatch } = useContext(UserContext);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const handleLogout = () => {
    signOut(auth).then(() => {
      userDispatch({ type: 'LOGOUT' })
      window.location.href = "/";
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

  const viewProfile = (
    <Menu style={{ margin: "12px 5px 0 0", padding: 0, lineHeight: 0, width: "210px" }}>
      <Menu.Item key="1" className='bg-gray-700 '>
        <div className='text-white hover:text-gray-700 duration-200'>
          <Link to="/view-profile" className='text-white hover:text-gray-700'>
            <div className="flex items-center justify-center">
              <UserOutlined className='text-7xl pt-1' />
            </div>
            <h1 className="text-center leading-tight text-inherit mt-3" style={{ textTransform: "capitalize" }}>
              {userProfile ? nameTruncator(userProfile.name) : 'Getting name...'}
            </h1>
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item key="2" className="flex items-center">
        <EditOutlined />
        &nbsp;
        &nbsp;
        <Link to="/view-profile">Edit Profile </Link>
      </Menu.Item>
      <Menu.Divider style={{ margin: 0 }} />
      <Menu.Item key="3">
        <LogoutOutlined />
        &nbsp;
        &nbsp;
        <Link to="/" onClick={e => {
          e.preventDefault();
          popLogout();
        }
        }>Logout</Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      {/*View Profile*/}
      <Dropdown
        overlay={viewProfile}
        placement='bottomCenter'
        className='flex justify-center items-center text-white'
        trigger={['click']}
      >
        <Link
          to=""
          onClick={e => e.preventDefault()}
          className='flex items-center text-caption'
        >
          <span className="mr-3">
            Profile
          </span>
          <UserOutlined />
        </Link>
      </Dropdown>

      <Modal
        visible={logoutConfirm}
        closable={false}
        maskClosable={false}
        footer={false}
        width={350}
        centered
      >
        <h1 className="text-center font-medium text-body text-gray-700">
          Continue to Logout?
        </h1>
        <div className="flex items-center justify-center mt-5">
          <Space>
            <button
              type="button"
              onClick={handleLogout}
              className='bg-blue-500 text-white px-7 py-3 text-xl rounded font-semibold flex items-center'
            >
              <CheckOutlined />
            </button>

            <button
              type="button"
              onClick={popLogoutClose}
              className='bg-red-500 text-white px-7 py-3 text-xl rounded font-semibold flex items-center'
            >
              <CloseOutlined />
            </button>
          </Space>
        </div>
      </Modal>
    </>
  )
}

const nameTruncator = text => {
  return text.length >= 14 ? text.slice(0, 14) + " ..." : text;
}

export default AdminProfile