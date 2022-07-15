import { Link } from 'react-router-dom'
import { Collapse } from 'antd';
const { Panel } = Collapse;

const FAQ = () => {

  const faq = [
    {
      id: 1,
      header: <p className='font-medium text-subbody'> How do I Sign Up? </p>,
      title: <p>
        You can <Link to="/signup"> <span className='text-blue-900 font-medium'> Click here to Sign Up </span></Link> , fill out the requirements in each field if applicable,
        upload valid photo of selected type of ID while following the designated front and back
        upload area. Wait until a Barangay officer validate your registration and sends an email
        with your username and password for you to log-in. </p>
    },
    {
      id: 2,
      header: <p className='font-medium text-subbody'> Why is my Account Verification taking so long? </p>,
      title: <p> Barangay officials have a limited number of workers, it usually takes
        <b> 2-3 days for the verification process </b> and it will be sent directly to your email provided
        in the registration, you will receive <b>two different emails</b>- the first one is for Email
        Validation and other one is for User Credentials to login. </p>
    },
    {
      id: 3,
      header: <p className='font-medium text-subbody'> Where can I see or download my QR code? </p>,
      title: <p>  You can see your QR code once you successfully logged in to your account  </p>
    },
    {
      id: 4,
      header: <p className='font-medium text-subbody'>  What is the purpose of my QR code?</p>,
      title:  <p> When visiting the barangay office, you can use your QR code to automatically 
        assign and <b>serve as a ticket for your transaction.</b> The QR code can also be utilized to 
        collect Ayuda, relief products, cash-aids, and so on.  </p>
    },
    {
      id: 5,
      header: <p className='font-medium text-subbody'>  What is the purpose of my QR code?</p>,
      title: <p> By creating an account, local officials can <b> TRACK IT's residents of the barangay, </b>
         <b>record events</b> and <b>nuisances in your neighborhood</b> in a convenient and discrete manner, and
          <b>get latest barangay news</b> from the source by seeing Announcements and direct alerts. It also <b>saves 
          you from waiting in long queues at barangay offices when you need documents like barangay
          clearances and other items.</b>  </p>
    },
    {
      id: 6,
      header: <p className='font-medium text-subbody'> Is my personal data safe? </p>,
      title: <p> The developers utilized modern era <b>cloud-based database</b> for the website and account storing, 
        breaching to the database and stealing valuable information will be <b>extremely difficult</b> even for a veteran
         hacker. The developers assure you that your information provided in the registration, transactions, 
         communications, and your whole identity and of your family is safe.   </p>
    },
    {
      id: 7,
      header: <p className='font-medium text-subbody'> Who developed TRACK IT? </p>,
      title: <p> <b>TRACK IT </b>is a system developed by third year college students from <b>PUP</b>, it is part 
        of the special program of the ITECH campus turned over to <b>barangay cupang west for the constituents to use. </b></p>
    },
    {
      id: 8,
      header: <p className='font-medium text-subbody'> What is TRACK IT? </p>,
      title: <p> Track-it is a profiling system that uses modern system architecture, modern programming language, 
        minimalist UI/UX design, and uses an up to date tech stacks. The system tracks the barangay’s population 
        growth, transactions, emergency history, and other valuable data that deserves to be recorded. It also
         helps the users to track their transactions, documents, schedules, news, information, and more. </p>
    },
  ]
  return (
    <>
      <div className="flex justify-center bg-blue-500 h-32 items-center w-full">
        <h1 className="text-xl font-semibold text-white">
          Frequently Asked Questions
        </h1>
      </div>
      <div className='px-10' style={{ paddingTop: 60, }}>
        {
          faq.map((a) => (
            <Collapse accordion className='rounded-md shadow-md' style={{ marginTop: 10 }}>
              <Panel faq={a} header={<div className='text-lg'>{a.header}</div>} key={a.id} style={{ paddingTop: 5 }}>
                <p className='px-5'>{a.title}</p>
              </Panel>
            </Collapse>
          ))}
      </div>
      <div className='flex justify-start px-10' style={{ paddingTop: 50, paddingBottom: 100 }}>
        <Link to='/'>
          <button className='border-2 bg-blue-500 text-white rounded-md px-5 py-2 hover:bg-blue-400 hover:text-white'> Back </button>
        </Link>
      </div>
      <div className="flex justify-center bg-blue-500 items-center py-2">
        <h1 className="text-sky-50 font-semibold" id="footer">
          © 2021-2022 TRACK IT PHILIPPINES
        </h1>
      </div>
    </>
  )
}

export default FAQ;