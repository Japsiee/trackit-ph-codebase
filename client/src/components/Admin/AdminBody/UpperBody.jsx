import React, { useContext } from 'react'
import MaleIcon from '../../../assets/images/icons/male.png'
import FemaleIcon from '../../../assets/images/icons/female.png'
import { GeneralContext } from '../../../contexts/GeneralContext';

const UpperBody = () => {
const { population } = useContext(GeneralContext)

    return(
      <div 
        className="flex justify-between items-center p-5 px-10 bg-blue-500 text-white" 
        style={{ 
          paddingBottom: "50px" 
        }}
      >
        <div>
          <p>Welcome back admin</p>
          <p>Mabuhay Cupang West !</p>
        </div>

        <div 
          className='flex justify-between items-center'
          style={{
            width: 170
          }}
        >
          <div className="flex items-center">
            <img 
              src={ MaleIcon } 
              alt="male icon" 
              className='h-16 mr-1'
            />
            <div>
              <p>Male</p>
              <p>{ !population.male.length ? "0" : population.male.length }</p>
            </div>
          </div>

          <div className="flex items-center">
            <img 
              src={ FemaleIcon } 
              alt="female icon" 
              className='h-16 mr-1'
              />
            <div>
              <p>Female</p>
              <p>{ !population.female.length ? "0" : population.female.length }</p>
            </div>
          </div>
        </div>
      </div>  
    )
}

export default UpperBody