import { Link } from 'react-router-dom';
import BannerImage from '../../assets/images/cupang/3.jpg'

const Banner = () => {
  return (    
    <div className="md:p-10 relative flex justify-center items-center" style={{
      backgroundImage: `url(${BannerImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '500px'
    }}>
      <div className="w-full h-full absolute top-0 left-0 z-0" style={{ 
        opacity: .30,
        zIndex: 1,
        background: "#1e3a8a"
        }}></div>
      <div style={{ zIndex: 2 }}>
        {/* <p className="text-center text-lg md:text-xl lg:text-4xl text-white pt-20 pb-2">
          OUR DEDICATION TO KEEPING BARANGAY CUPANG WEST SAFE
        </p> */}
        <p className="text-subheading md:text-banner text-white text-center font-normal w-full mx-auto pt-20 pb-4">
          OUR DEDICATION TO KEEPING BARANGAY CUPANG WEST SAFE
        </p>
        <p className="text-body md:text-heading text-white text-center font-thin w-5/6 mx-auto">
          This is the official website of barangay cupang west for announcements, concerns and request of documents
        </p>
        <div className='flex justify-center'>
          <Link 
            to="/signup"
            className="bg-blue-500 my-5 text-white mx-3 text-caption p-2 px-3 font-semibold rounded-full hover:bg-white hover:text-blue-500 duration-200"
          >
            <i className="fas fa-user-plus pr-1"></i> SIGN UP
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Banner
