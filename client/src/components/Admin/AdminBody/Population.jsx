import React, { useContext } from 'react'
import {AreaChartOutlined, PieChartOutlined, BarChartOutlined, DotChartOutlined} from '@ant-design/icons'
import { GeneralContext } from '../../../contexts/GeneralContext';

const Population = () => {
const { population } = useContext(GeneralContext)

return(
    <>
        {/* POPULATION */}
        <div 
            className="flex items-center justify-between px-10"
            style={{
                marginTop: "-35px"
            }}
        >
            {/* PETS */}
            <div className="bg-white p-5 shadow-lg flex items-center rounded">
                <AreaChartOutlined className="bg-neutral-900 text-5xl p-2 rounded-lg text-white" />
                <div className='block px-5'>
                    <div className="flex items-center py-1 font-semibold">
                        Pets
                    </div>
                    <div className='flex items-center justify-between py-1'>
                        <span className='font-medium'>Total</span>
                        <span className='ml-3'>{ !population.pets.length ? "0" : population.pets.length }</span>
                    </div>
                    <div className='flex items-center justify-between py-1'>
                    </div>
                </div>
            </div>  

            {/* PWD */}
            <div className="bg-white p-5 shadow-lg flex items-center rounded">
                <PieChartOutlined className="bg-neutral-900 text-5xl p-2 rounded-lg text-white" />
                <div className='block px-5'>
                    <div className="flex items-center py-1 font-semibold">
                        PWD
                    </div>
                    <div className='flex items-center justify-between py-1'>
                        <span className='font-medium'>Total</span>
                        <span className='ml-3'>{ !population.pwd.length ? "0" : population.pwd.length }</span>
                    </div>
                    <div className='flex items-center justify-between py-1'>
                    </div>
                </div>
            </div>

            {/* 4P's */}
            <div className="bg-white p-5 shadow-lg flex items-center rounded">
                <DotChartOutlined className="bg-neutral-900 text-5xl p-2 rounded-lg text-white" />
                <div className='block px-5'>
                    <div className="flex items-center py-1 font-semibold">
                        4P's
                    </div>
                    <div className='flex items-center justify-between py-1'>
                        <span className='font-medium'>Total</span>
                        <span className='ml-3'>{ !population.fourps.length ? "0" : population.fourps.length }</span>
                    </div>
                    <div className='flex items-center justify-between py-1'>
                    </div>
                </div>
            </div>

            {/* SENIOR */}
            <div className="bg-white p-5 shadow-lg flex items-center rounded">
                <BarChartOutlined className="bg-neutral-900 text-5xl p-2 rounded-lg text-white" />
                <div className='block px-5'>
                    <div className="flex items-center py-1 font-semibold">
                        Senior
                    </div>
                    <div className='flex items-center justify-between py-1'>
                        <span className='font-medium'>Total</span>
                        <span className='ml-3'>{ !population.senior.length ? "0" : population.senior.length }</span>
                    </div>
                    <div className='flex items-center justify-between py-1'>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}


export default Population