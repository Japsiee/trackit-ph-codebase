import 'antd/dist/antd.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main.css';
import './tailwind.css';
import './index.css'

import Page404 from './components/Page404/Page404';
import ForgotPassword from './components/Unauthorized/ForgotPassword';
import ResetPassword from './components/Unauthorized/ResetPassword';
import Landing from './components/Unauthorized/Landing'; 
import AdminLanding from './components/Admin/AdminLanding';
import SuperLanding from './components/Super/SuperLanding';
import UserLanding from './components/User/UserLanding';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { UserInfoContext } from './contexts/UserInfoContext';
import { UserInfoContextProvider } from './contexts/UserInfoContext';

import Signup from './components/Unauthorized/Signup/Signup';
import FAQ from './components/Unauthorized/FAQ';
import Dashboard from './components/User/Dashboard/Dashboard';
import Document from './components/User/Document/Document';
import Report from './components/User/Report/Report';
import Profile from './components/User/Profile/Profile';
import Complaints from './components/User/Complaints/Complaints';

import DashboardBody from './components/Admin/AdminBody/DashboardBody'
import AnnouncementBody from './components/Admin/AdminBody/AnnouncementBody'
import DocumentIssuanceBody from './components/Admin/AdminBody/DocumentIssuanceBody'
import ResidentRequest from './components/Admin/AdminBody/DashboardContent/ResidentBody/ResidentRequest'
import ResidentProfile from './components/Admin/AdminBody/DashboardContent/ResidentBody/ResidentProfile'
import IncidentReport from './components/Admin/AdminBody/DashboardContent/ResidentReport/IncidentReport'
import ComplaintReport from './components/Admin/AdminBody/DashboardContent/ResidentReport/ComplaintReport'
import ViewProfile from './components/Admin/AdminHeader/ViewProfile';

// import AdminSettings from './components/Super/AdminSettings';
import MonitorAdmin from './components/Super/MonitorAdmin';

import { getAuth } from "firebase/auth";

function App() {
  const auth = getAuth();  
  const { userState, userDispatch } = useContext(UserContext);
  const { setLoading } = useContext(UserInfoContext);
  const [client, setClient] = useState(null);

  useEffect(() => {
    setLoading(true);

    if (!userState) {
      setTimeout(() => {     
        const userCreds = auth.currentUser;
        if (userCreds)  {
          readClient(userCreds.email)
            .then(userInfo => {          
              const user = {
                ...userCreds,
                role: userInfo.data.attr.role
              }
    
              if (user.emailVerified) {
                userDispatch({ type: 'VERIFIED_EMAIL', payload: user })
                setClient(userState);
              } else {
                userDispatch({ type: 'UNVERIFIED_EMAIL', payload: user })
                setClient(userState);
              } 
            })
            setLoading(false);
          } else {
          console.log('no creds')
          setLoading(false);
        }
      }, 2500)
    } else {
      setClient(userState);
      setLoading(false);
    }
  // eslint-disable-next-line
  }, [userState]) 

  return (
    <>
      <Router>      
        <Routes>          
          <Route path="/*" element={<Page404 />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={ <Signup /> } />
          {
            !client || client.data.role === null ?                      
            <>
              <Route path="/" element={
                <UserInfoContextProvider elem={ 
                  <Landing />
                 } />
              } />
            </>      
            :
            <>
              {
                client.data.role === 'admin' ?
                <>
                  <Route path="/" element={<AdminLanding display={ <DashboardBody /> } />} />
                  <Route path="/dashboard" element={<AdminLanding display={ <DashboardBody /> } />} />
                  <Route path="/resident-request" element={<AdminLanding display={ <ResidentRequest /> } />} />
                  <Route path="/resident-profile" element={<AdminLanding display={ <ResidentProfile /> } />} />
                  <Route path="/incident-report" element={<AdminLanding display={ <IncidentReport /> } />} />
                  <Route path="/complaint-report" element={<AdminLanding display={ <ComplaintReport /> } />} />
                  <Route path="/announcements" element={<AdminLanding display={ <AnnouncementBody /> } />} />
                  <Route path="/document-issuance" element={<AdminLanding display={ <DocumentIssuanceBody /> } />} />
                  <Route path="/view-profile" element={<ViewProfile profile={ client } />} />
                </>
                :
                ""
              }
      
              {
                client.data.role === 'super' ?
                <> 
                  <Route path="/"  element={<SuperLanding display={ <MonitorAdmin /> } />} />
                  <Route path="/monitor-admin" element={<SuperLanding display={ <MonitorAdmin /> } />} />
                  <Route path="/monitor-user" element={<SuperLanding display={ <ResidentProfile /> } />} />
                </>         
                :
                ""
              }
      
              {
                client.data.role === 'user' ?
                <>
                  <Route 
                    path="/issuance-document" 
                    element={<UserInfoContextProvider elem={ 
                      <UserLanding elem={ <Document /> } />
                    } /> } />
                  <Route 
                    path="/complaints" 
                    element={ <UserInfoContextProvider elem={ 
                      <UserLanding elem={ <Complaints /> } />                       
                    } /> } />
                  <Route 
                    path="/profile" 
                    element={ <UserInfoContextProvider elem={ 
                      <UserLanding elem={ <Profile /> } />                      
                    } /> } />
                  <Route 
                    path="/incident-report" 
                    element={ <UserInfoContextProvider elem={ 
                      <UserLanding elem={ <Report /> } />
                       
                    } /> } />
                  <Route 
                    path="/" 
                    element={ <UserInfoContextProvider elem={ 
                      <UserLanding elem={ <Dashboard /> } /> 
                    } /> } />                                        
                </>
                :
                ""
              }        
            </>
          }

        </Routes>      
      </Router>
    </>
  );
}

const readClient = async clientEmail => {
  const response = await fetch(`/client/${clientEmail}`);
  const data = await response.json();
  return data;
}

export default App;