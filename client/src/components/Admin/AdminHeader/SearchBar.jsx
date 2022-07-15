import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = () =>{
    const [searchContext, setSearchContext] = useState('');

    const search = () => {
        console.log(searchContext)
    }
  
    return(
        <>
            {/* <input 
                type="search"
                className='py-2 px-4 rounded-full'
            /> */}
            <div className="bg-white py-2 px-4 flex items-center rounded-full">
                <input 
                    type="text" 
                    placeholder='Search here'
                    onChange={ e => setSearchContext(e.target.value) }
                />
                <button
                    onClick={ search }
                >
                    <SearchOutlined className='pl-4' />
                </button>
            </div>
        </>
    )
}

export default SearchBar