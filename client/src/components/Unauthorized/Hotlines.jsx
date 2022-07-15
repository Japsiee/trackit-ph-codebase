import React from 'react'

const hotlines = [
  {
    id: 1,
    name: 'Kap. Ernesto Nisay',
    number: '791-3891'
  },
  {
    id: 2,
    name: 'Kon. Edgardo Inieto',
    number: '0926-335-0797'
  },
  {
    id: 3,
    name: 'Kon. Crisostomo Nisay',
    number: '0928-622-3201'
  },
  {
    id: 4,
    name: 'CCDO',
    number: '237-0698'
  },
  {
    id: 5,
    name: 'CEO',
    number: '237-0712'
  },
  {
    id: 6,
    name: 'GSO',
    number: '237-6041'
  },
  {
    id: 7,
    name: 'CHO',
    number: '237-4333'
  },
  {
    id: 8,
    name: 'HRMO',
    number: '237-0720'
  },
  {
    id: 9,
    name: 'LCR',
    number: '237-7686'
  },
  {
    id: 10,
    name: 'PESO',
    number: '237-0718'
  },
  {
    id: 11,
    name: 'MISO',
    number: '237-3113'
  },
  {
    id: 12,
    name: 'CPDO',
    number: '791-2724'
  },
  {
    id: 13,
    name: 'PSO',
    number: '237-4477'
  },
  {
    id: 14,
    name: 'CSWDO',
    number: '237-0716'
  },
  {
    id: 15,
    name: 'CTO',
    number: '237-0704'
  }
]

const Hotlines = () => {
  return (
    <div className='h-auto p-5 py-10'>
      <h1 className="pb-4 pt-4 font-semibold text-body">
        BARANGAY MAP &amp; EMERGENCY HOTLINES
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
        <iframe title="city of balanga" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.752065165733!2d120.53913841468895!3d14.670006979305281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33963ff730e6f62f%3A0x4d7e935d8ec848a4!2sCupang%20West%2C%20City%20of%20Balanga%2C%20Bataan!5e0!3m2!1sen!2sph!4v1642151315588!5m2!1sen!2sph" className='w-full h-96' allowFullScreen loading="lazy"/>
        <div className='px-0 md:px-5 pt-5 md:pt-0 overflow-y-scroll max-h-96'>
          {
            hotlines.map(h => (
              <div className='mb-5' key={ h.id }>
                <h1 className='m-0 font-semibold'>{ h.name }</h1>
                <p className='m-0'>{ h.number }</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Hotlines
