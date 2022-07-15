import Cards from './Cards';

const Announcements = ({ data }) => {
  
  return (
    <div className='p-7 md:p-8'>      
      <div className="text-gray-700">
        <h1 className="text-body md:text-heading font-medium text-blue-500 text-medium text-center mt-7 md:mt-0">
          BARANGAY CUPANG WEST ANNOUNCEMENTS
        </h1>
        <p className="text-caption lg:text-body font-light text-center pt-3 pb-5">
          Everything you need to know within Barangay 
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 w-full mx-auto pt-5" style={{
          maxWidth: '1400px'
        }}>
          {
            !data ? 
            ""
            :
            data.map((a) => (
              <Cards ann={a} key={a._id} />
            ))
          }
        </div>        
      </div>
    </div>
  )
}

export default Announcements
