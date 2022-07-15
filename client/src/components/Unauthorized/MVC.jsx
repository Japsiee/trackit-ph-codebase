import { Carousel } from 'antd';

const mvc = [
  {
    id: 1,
    title: "-- Pangarap --",
    detail: "Barangay Cupang West, maging sentro ng siglang pambarangay sa pagsusulong ng mataas na kalidad na edukasyon, programang pang kalusugan,  matiwasay na pamumuhay at matatag na pananampalataya sa Diyos."
  },
  {
    id: 2,
    title: "-- Layunin --",
    detail: "Palakasin ang partisipasyon ng pamilya, paaralan, mamumuhunan, simbahan at pamahalaang barangay sa pagtugon sa hamon ng barangay at makabagong Balanga sa pagiging World Class University Town."
  },
]

const MVC = () => {
  
  return (
    <Carousel autoplay dots={{ className:"bg-blue-500 p-1 pb-5 rounded" }}>
      {
        mvc.map(record => (
          <div className='h-100 bg-blue-500 p-10 md:pt-3' key={ record.id }>
            <h1 className="text-body md:text-subheading text-white tracking-wider font-medium uppercase text-center md:pt-5">
              { record.title }
            </h1>
            <p className="text-caption md:text-subbody pt-3 pb-5 font-light text-white text-center mx-20">
              { record.detail }
            </p>
          </div>      
        ))
      }

    </Carousel>
  )
}

export default MVC
