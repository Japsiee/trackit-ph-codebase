import React from 'react'
import {Input, Button} from 'antd'

import {SearchOutlined} from '@ant-design/icons'

const SearchBar = () => {
  return (
    <div className='flex justify-center'>  
        <Input placeholder="Input Search Text"
            style={{
                items: "center",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                width: "200px",
                height: "35px",
            }}/>
        <Button 
            type="default"
            className="login-form-button items-center" 
            style={{
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            color: "black",
            width: "50px",
            height: "35px"
            }}
        >
        <SearchOutlined className="text-black text-xl pb-1"/>
        </Button>
    </div>
  )
}

export default SearchBar