import React, { useContext, useEffect } from 'react';

// Admin Header Import
import LogoName from './AdminHeader/LogoName';
import SettingsDropDown from './AdminHeader/SettingsDropDown';
import ScheduleDropDown from './AdminHeader/ScheduleDropDown';
// import SearchBar from './AdminHeader/SearchBar';
// import AdminMessages from './AdminHeader/AdminMessages'
// import AdminNotif from './AdminHeader/AdminNotif';
import AdminProfile from './AdminHeader/AdminProfile';
// Admin Navbar Import
import BarangayResident from './AdminNavbar/BarangayResident';
import ResidentReport from './AdminNavbar/ResidentReport';
import BarangayDashboard from './AdminNavbar/BarangayDashboard';
import IssuanceDocuments from './AdminNavbar/IssuanceDocuments';
import Announcements from './AdminNavbar/Announcements';
// Admin Body Import
import UpperBody from './AdminBody/UpperBody';
import Population from './AdminBody/Population';

import { GeneralContext } from '../../contexts/GeneralContext';
import { UserInfoContext } from '../../contexts/UserInfoContext';
import { UserContext } from "../../contexts/UserContext";

import { Space } from 'antd'
// import { getAuth, signOut } from "firebase/auth";

const AdminLanding = ({ display }) => {
  const { setPopulation } = useContext(GeneralContext);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { userState } = useContext(UserContext);

  const browseClient = async () => {
    const result = await fetch('/client');
    const data = await result.json();
    return data;
  }

  useEffect(() => {
    if (userState) {
      if (!userInfo) {
        readClient(userState.email)
          .then(data => {
            const info = {
              _id: data.data._id,
              name: data.data.attr.name,
              email: data.data.email,
              qrCode: data.data.qrCode,
              address: data.data.attr.address,
              pets: data.data.pets,
              phone: data.data.attr.phone,
              gender: data.data.attr.gender,
              birthdate: data.data.attr.birthdate,
              categ: {
                pwd: data.data.categ.pwd,
                fourps: data.data.categ.fourps
              }
            }
  
            setUserInfo(info);
          })
          .catch(error => {
            console.log(error)
          })
        }
    }
    // eslint-disable-next-line
  }, [userState, userInfo])

  useEffect(() => {
    browseClient()
      .then(data => {
        let pets = [];

        const male = data.data.filter(person => {
          return person.attr.gender === 'male'
        })

        const female = data.data.filter(person => {
          return person.attr.gender === 'female'
        })

        const pwd = data.data.filter(person => {
          return person.categ.pwd === true;
        })

        const fourps = data.data.filter(person => {
          return person.categ.fourps === true;
        })

        const petQuant = data.data.map(pet => {
          return parseInt(pet.quantity)
        })

        for(let i = 0; i < petQuant.length; i++) {
          pets.push(petQuant[i])
        }

        const senior = data.data.filter(person => {
          const ndate = new Date();  
          const currentYear = ndate.getFullYear();
          let yearBorn = '';
          if (person.attr.birthdate) {
            yearBorn = person.attr.birthdate.split('-')[0];
          } else {
            yearBorn = 2022
          }
          const age = currentYear - yearBorn;
          
          return age >= 40;
        })

        setPopulation({
          male,
          female,
          pwd,
          fourps,
          pets,
          senior
        })              
        
      })
      .catch(err => {
        console.error(err)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="hidden lg:block">
        <div className='flex justify-between items-center bg-blue-500 px-10 py-2'>
          <div className="flex items-center">
            <LogoName />
            <Space size={ 10 }>
              <span className='text-white'>|</span>
              <SettingsDropDown />
              <span className='text-white'>|</span>
              <ScheduleDropDown />
              <span className='text-white'>|</span>
            </Space>
          </div>

          <div className='flex items-center'>            
              {/* <SearchBar />
              <AdminMessages />
              <AdminNotif /> */}              
              <AdminProfile userProfile={ userInfo } />
          </div>
        </div>
        
        <div className='flex justify-between items-center p-4 px-8 bg-white'> 
          <BarangayDashboard />
          <BarangayResident />
          <ResidentReport />
          <Announcements />
          <IssuanceDocuments />
        </div>
        
        <UpperBody/>

        <Population/>
      <div>
        
    { display } 
    
      </div>
      <div className="flex justify-center bg-blue-500 items-center py-2 w-full mt-5">
          <h1 className="text-sky-50 font-semibold" id="footer">
            © 2021-2022 TRACK IT PHILIPPINES
          </h1>
        </div>
        </div>
      <div className="flex justify-center items-center lg:hidden h-screen">
        <h1 className="font-semibold text-2"> Cannot access through mobile phone</h1>

      </div> 
    </>
  )
}

const readClient = async clientEmail => {
  const response = await fetch(`/client/${clientEmail}`);
  const data = await response.json();
  return data;
}

export default AdminLanding
