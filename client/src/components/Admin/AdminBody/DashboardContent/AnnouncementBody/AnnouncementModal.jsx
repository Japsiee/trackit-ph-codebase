import { useState } from 'react';
import { Input, Modal, message, Progress } from 'antd';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../../../firebase/index'
import { ref, uploadBytesResumable } from '@firebase/storage'

const AnnouncementModal = () => {
    const [formIsVisible, setFormIsVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [load, setLoad] = useState(0);
    const [fileSelected, setFileSelected] = useState(null);
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState({
        title: null,
        description: null,
        photoBy: null,
        attachedImage: null
    });

    const handleSubmitAnnouncement = () => {
        if (!announcement.title || !announcement.description) {
            message.warn(
                <div className='flex items-center font-normal mt-3 text-yellow-500'>
                    Incomplete details
                </div>, 2
            );
        } else {
            setIsSaving(true);

            createAnnouncement(JSON.stringify(announcement))
                .then(data => {
                    console.log(data);
                    const annRef = ref(storage, `ann/images/${data.data._id}/${data.data.attachedImage}`);
                    const ann = uploadBytesResumable(annRef, fileSelected);
        
                    ann
                        .on("state_changed", snapshot => {
                            let loads = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                            setLoad(loads)
                        }, (error) => {
                            console.log(error);
                        }, () => {
                            navigate('/');
                        })
                })
                .catch(err => {
                    console.log(err)
                    message.error(
                        <div className='flex items-center font-normal mt-3 text-yellow-500'>
                            Failed to post the announcement. Please try again
                        </div>, 4
                    );
                    setIsSaving(false);
                })
        }
    }

    const handleImage = (e) => {
        setFileSelected(e.target.files[0]);
        setAnnouncement({ ...announcement, attachedImage: e.target.files[0].name })
    }

    return(
        <>
            <button 
                className="bg-blue-500 text-white text-caption rounded-md p-2"
                onClick={ () => setFormIsVisible(true) }
            >
                Add Announcement
            </button>

            <Modal 
                visible={formIsVisible} 
                closable={ false } 
                footer={ false } 
                centered
            >
                <h2 className="font-semibold mb-2">
                    Announcement title
                </h2>
                <Input 
                    placeholder='Title here'
                    className='mb-3'      
                    onChange={ (e) => setAnnouncement({ ...announcement, title: e.target.value }) }               
                />

                <h2 className="font-semibold mb-2">
                    Announcement description
                </h2>
                <Input.TextArea
                    placeholder='Description here'
                    className='mb-3' 
                    onChange={ (e) => setAnnouncement({ ...announcement, description: e.target.value }) }
                    autoSize={{ minRows: 5, maxRows: 5 }}
                />

                <h2 className="font-semibold mb-2">
                    Captured by
                </h2>
                <Input 
                    placeholder='Title here'
                    className='mb-3'      
                    onChange={ (e) => setAnnouncement({ ...announcement, photoBy: e.target.value }) }               
                />

                <h2 className="font-semibold mb-2">
                    Attach image
                </h2>
                <input type="file" className='mb-5 block' onChange={ handleImage } />
                <Progress percent={ load } />

                <button 
                    className="bg-white border-2 text-blue-500 rounded-lg p-3 block w-full"
                    onClick={ () => setFormIsVisible(false) }
                    disabled={ isSaving }
                >
                    CANCEL
                </button>
                <button 
                    className="bg-blue-500 text-white rounded-lg p-3 block w-full mt-3"
                    onClick={ handleSubmitAnnouncement }
                    disabled={ isSaving }
                >
                    { isSaving ? "UPLOADING POST..." : "POST" }
                </button>

            </Modal>
        </>
    )
}

const createAnnouncement = async (reqBody) => {
    const response = await fetch('/announcement', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: reqBody
    })

    const createdAnnouncement = await response.json();
    return createdAnnouncement;
}

export default AnnouncementModal;