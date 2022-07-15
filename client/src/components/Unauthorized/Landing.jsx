import { useContext, useEffect, useState } from 'react';

import { UserInfoContext } from "../../contexts/UserInfoContext";

import Navbar from './Navbar';
import Banner from './Banner';
import Announcements from './Announcements/Announcements';
import MVC from './MVC';
import Footer from './Footer';
import Hotlines from './Hotlines';
import LoadingEffect from './LoadingEffect';
import { getDownloadURL, ref, getStorage } from '@firebase/storage'

const Landing = () => {  
  const { loading, setLoading } = useContext(UserInfoContext);
  const [announcements, setAnnouncements] = useState(null);
  const storage = getStorage();  

  useEffect(() => {
    setLoading(true);    

    listAnnouncements()
      .then(data => {
        setupAnnouncement(data.data);        
      })
      .catch(err => {
        console.log(err);
      })

    // eslint-disable-next-line
  }, [])

  const setupAnnouncement = async (announcements) => {
    try {      
      let allAnnouncement = [];
      
      for (let announcement of announcements) {
        if (announcement.attachedImage) {
          const listAnnouncementRef = ref(storage, announcement.attachedImage);
          const image = await getDownloadURL(listAnnouncementRef);

          const data = {
            ...announcement,
            attachedImage: image
          }

          allAnnouncement.push(data);
        } else {
          allAnnouncement.push(announcement);
        }
      }
      
      setAnnouncements(allAnnouncement)
      setLoading(false);
    } catch(error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   listAll(listAnnouncementRef)
  //     .then((res) => {
  //       res.prefixes.forEach((folderRef) => {
  //         console.log(folderRef);
  //       });
  //       // res.items.forEach((itemRef) => {
  //       //   console.log(itemRef);
  //       // });
  //     }).catch((error) => {
  //       // Uh-oh, an error occurred!
  //     });
  //     // eslint-disable-next-line
  // }, [])

  return (
    loading ?
      <LoadingEffect />
    :
    <>
      <Navbar />
      <Banner />  
      <Announcements data={ announcements } />
      <MVC />
      <Hotlines />
      <Footer />
    </>
  )
}

const listAnnouncements = async () => {
  const response = await fetch('/announcement');
  const data = await response.json();
  return data;
}

export default Landing
