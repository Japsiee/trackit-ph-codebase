import { useContext } from 'react';
import { UserInfoContext } from '../../../contexts/UserInfoContext';
import Footer from '../Footer/Footer';
import LoadingEffect from '../../Unauthorized/LoadingEffect';

const Dashboard = () => {  
  const { userInfo } = useContext(UserInfoContext);

  return(
    !userInfo ?
    <LoadingEffect />
    :
    <>
      <div className="h-full">
        <div className="flex justify-center items-center mt-10 mb-5">          
          <img 
            src={ userInfo ? userInfo.qrCode : "" } 
            alt="qrcode" 
            className='w-full' 
            style={{ maxWidth: '400px' }} 
          />
        </div>

        <h1 className="capitalize text-xl md:text-3xl text-blue-500 font-semibold text-center m-0">
          { userInfo ? userInfo.name : "" }          
        </h1>

        <div className="flex justify-center">
          <a 
            href={ userInfo ? userInfo.qrCode : "" }
            className='px-4 py-2 my-5 rounded-full text-caption bg-blue-500 text-white shadow hover:bg-blue-700 duration-200 hover:text-white'
            download={ `CUPANGWEST-QRCODE-${ userInfo ? userInfo.name.toUpperCase() : "" }` }
          >
            Download QR code
          </a>
        </div>

        <p className="text-gray-400 text-center mb-20">
          Please contact your barangay's admin for customer support
        </p>
      </div>

      <Footer />
    </>
  )
}

export default Dashboard;