 import {React} from 'react' 
 import {Link} from 'react-router-dom'
 import TrackitLogo from '../../../assets/images/logos/trackitph500.png'

 const LogoName = () => {
    /*Track IT Logo*/
    return(
    <>
        <div className='flex items-center mr-10'>
            <img 
                src={ TrackitLogo } 
                alt="trackit-ph" 
                className="TrackITLogo object-fit rounded-full w-10 h-10 bg-white p-1" 
            />
            <Link to="/" className='hover:text-blue-900'>
                <p className='mx-3 my-4 text-white text-2xl font-bold'> 
                    TRACK IT
                </p> 
            </Link>
        </div>
    </>
    )
 }

 export default LogoName