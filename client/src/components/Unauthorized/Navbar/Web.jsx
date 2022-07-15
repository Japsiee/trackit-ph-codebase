import { Link } from 'react-router-dom';
import TrackitLogo from '../../../assets/images/logos/trackitph.png'

import React, { useState } from 'react';
import { Modal } from 'antd';
import LoginForm from '../Login/LoginForm';


const Web = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  return (
    <>
      <div className="hidden md:flex justify-between items-center px-3 md:px-7 py-2">
        <Link to="/" className='text-gray-700'>
          <div className='flex items-center'>
              <img src={ TrackitLogo } alt="trackit-ph" className="TrackITLogo" />
              <div className="text-center px-3">
                <p className='text-subbody'>
                  TRACK&nbsp;IT
                </p>
                <p className="text-caption">
                  Cupang West
                </p>
              </div>
          </div>
        </Link>

        <div>
          <Link 
            to="/faq"
            className='font-normal text-blue-500 text-caption tracking-wider'
          >
            FAQ
          </Link>
          <button 
            onClick={ showModal }
            className='bg-blue-500 text-white px-3 py-2 text-caption rounded ml-3 font-normal hover:bg-blue-400 duration-200'
          >
            LOGIN
          </button>
        </div>

        <Modal 
          visible={isModalVisible} 
          onCancel={ handleCancel }
          footer={ null }
          closable={ false }
          width={450}
          centered
        >
          <LoginForm />
        </Modal>
      </div>

      <div className="flex justify-between items-center md:hidden px-5 py-2 bg-blue-500 text-white">
        <span className="font-normal text-caption">
          TRACK IT
        </span>
        <button 
          onClick={ showModal }
          className='text-white rounded font-normal text-caption hover:font-semibold duration-200'
        >
          LOGIN
        </button>
      </div>
    </>
  )
}

export default Web
