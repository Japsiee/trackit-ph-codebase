import { useState } from 'react';
import { Card, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import NoImage from '../../../assets/images/others/noimage.png'

const Cards = ({ ann }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  return(
    <>
      <Card
        cover={ <img src={ ann.attachedImage || NoImage } alt={ ann.title } className='object-cover h-48 relative' /> }
      >    
        <div className="absolute opacity-0 hover:opacity-100 duration-200 w-full h-full top-0 left-0 flex items-start justify-end">
          <div className="bg-blue-500 text-white rounded hover:bg-blue-600 duration-200 flex">
            <button
              className='p-3 rounded border-0 flex items-center'
              onClick={ showModal }
            >
              <EyeOutlined />
            </button>
          </div>
        </div>
        <p
          className="font-bold"
        >
          { titleTruncator(ann.title) }
        </p>   
        <p>
          { detailTruncator(ann.description) }
        </p>      
      </Card>

      <Modal 
        title={ ann.title } 
        visible={isModalVisible}
        closable={ false }
        footer={ false }
      >         
        <p className="font-semibold mb-2">
          Date
        </p>
        <p className='font-normal italic text-left text-gray-700 mb-5'>{ ann.createdAt.slice(0,10) }</p>
        <p className="font-semibold mt-5 mb-2">
          Photo
        </p>
        <img src={ ann.attachedImage || NoImage } alt={ ann.title } className='object-cover' />
        <p className="font-semibold mt-5 mb-2">          
          Captured by: <span className='uppercase'>{ ann.photoBy }</span>
        </p>
        <p className="font-semibold mt-5 mb-2">
          Description
        </p>
        <p className='p-5 rounded' style={{ background: "#DDDDDD" }}>{ ann.description }</p>
        <div className="flex items-center justify-end mt-4">
          <button
            className='p-2 px-5 rounded bg-blue-500 text-white hover:shadow-lg hover:bg-blue-400 hover:text-white duration-100 border-0'
            onClick={ handleCancel }
          >
            Close
          </button>          
        </div>
      </Modal>
    </>
  )
}

const titleTruncator = text => {
  return text.length >= 30 ? text.slice(0,30) + " ..." : text;
}

const detailTruncator = text => {
  return text.length >= 80 ? text.slice(0,80) + " ..." : text;
}

export default Cards;