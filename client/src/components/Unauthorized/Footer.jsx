import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='bg-blue-500'>
        <div className='box-md mx-auto'>
          <div 
            className="grid grid-cols-1 md:grid-cols-4 text-white w-full md:px-5 md:pb-3 pt-5 gap-5"
          >
            <div className="md:col-span-1 p-5">
              <h1 className="font-medium text-subbody text-white border-b border-gray-50 pb-3">
                RESIDENTS ONLINE SERVICES
              </h1>
              <div className="mt-5">
                <Link to="/signup" className="text-caption text-gray-50 block hover:text-gray-300 duration-100 mb-3">
                  Residents Registration
                </Link>
                <Link to="/faq" className="text-caption text-gray-50 block hover:text-gray-300 duration-100 mb-3">
                  Frequently Asked Questions
                </Link>
              </div>

            </div>
            <div className="md:col-span-1 p-5">
              <h1 className="font-medium text-subbody text-white border-b border-gray-50 pb-3">
                DOWNLOADS
              </h1>
              <div className="mt-5">
                {/* <Link to="/" className="text-lg text-gray-50 block hover:text-gray-300 duration-100 mb-3">
                  QR Code
                </Link> */}
                <Link to="/" className="text-caption text-gray-50 block hover:text-gray-300 duration-100 mb-3">
                  Forms
                </Link>
              </div>

              <h1 className="font-medium text-subbody text-white border-b border-gray-50 pb-3 mt-5">
                OTHER SERVICES
              </h1>
              <div className="mt-5">
                <a href="http://cupangwest.cityofbalanga.gov.ph/" rel="noreferrer" target="_blank" className="text-caption text-gray-50 block hover:text-gray-300 duration-100 mb-3">
                  Our Profile
                </a>
                
              </div>
            </div>
            <div className="md:col-span-2 p-5">
              <h1 className="font-medium text-subbody text-white border-b border-gray-50 pb-3">
                SOCIAL MEDIAS
              </h1>
              <div className="mt-5 flex">
                <a 
                  href="/"
                  className='bg-white rounded p-3 text-xl md:text-4xl text-blue-500 mr-5 hover:bg-blue-900 hover:text-white duration-200'
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a 
                  href="/"
                  className='bg-white rounded p-3 text-xl md:text-4xl text-blue-500 mr-5 hover:bg-blue-900 hover:text-white duration-200'
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href="/"
                  className='bg-white rounded p-3 text-xl md:text-4xl text-blue-500 mr-5 hover:bg-blue-900 hover:text-white duration-200'
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>

              <h1 className="font-medium text-subbody text-white border-b border-gray-50 py-5">
                CONTACT US
              </h1>
              <div className="mt-5 text-caption">
                <p className="text-gray-50 mb-3">
                  Phone: <span className="font-semibold">{ "(+63) 926 3350 797" }</span>
                </p>
                <p className="text-gray-50 mb-3">
                  Email: <span className="font-semibold">cupangwest@gmail.com</span>
                </p>
                <p className="text-gray-50 mb-3">
                  Location: <span className="font-semibold">Masikap St, City of Balanga, 2100 Bataan</span>
                </p>
              </div>
            </div>
          </div>        
        </div>
      </div>
      <div className="flex justify-center items-center py-2">
        <h1 className='text-blue-500 font-semibold' id="footer">
          © 2021-2022 TRACK IT PHILIPPINES
        </h1>
      </div>
    </>
  )
}

export default Footer
