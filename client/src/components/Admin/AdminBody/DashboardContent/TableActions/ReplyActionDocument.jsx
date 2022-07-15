import React from 'react';
import { useState } from 'react';
import { Input, Modal, message } from 'antd';

import { CommentOutlined } from '@ant-design/icons'

const ReplyActionDocument = ({ record }) => {
    // Reply Modal;
    const [formIsVisible, setFormIsVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [replyBody, setReplyBody] = useState({
        subject: null,
        message: null,
        sendTo: record.email
    })

    const handleSubmitAnnouncement = async () => {
        if (!replyBody.subject || !replyBody.message) {
            message.warn(
                <div className='flex items-center font-normal mt-3 text-yellow-500'>
                    Incomplete fields!
                </div>, 2
            );
        } else {
            setIsSaving(true);
            
            const reqBody = JSON.stringify({
                subject: replyBody.subject,
                message: replyBody.message
            })

            const response = await sendEmailMessage(reqBody, replyBody.sendTo);
            if (response) {
                console.log(response);
                setIsSaving(false);
                setReplyBody({
                    ...replyBody,
                    subject: null,
                    message: null,
                    sendTo: record.email
                })
                setFormIsVisible(false);
                message.success(
                    <div className='flex items-center font-normal mt-3 text-green-500'>
                        Email sent!
                    </div>, 2
                );
            }
        }
    }

    return(
        <>
            
            <button 
            className="text-white rounded-md pt-1"
            onClick={ () => setFormIsVisible(true) }
            >
                <CommentOutlined className="text-blue-500 hover:text-green-500"
                    style={{
                        fontSize:"20px",
                 }} />
            </button>

            <Modal 
                visible={formIsVisible} 
                closable={ false } 
                footer={ false } 
                centered
            >
                <h2 className="font-semibold mb-2 capitalize">
                    Subject
                </h2>
                <Input 
                    placeholder='Subject'
                    className='mb-3 capitalize'    
                    value={ replyBody.subject } 
                    disabled={ isSaving }   
                    onChange={ (e) => setReplyBody({ ...replyBody, subject: e.target.value }) }
                />

                <h2 className="font-semibold mb-2">
                    Message
                </h2>
                <Input.TextArea
                    placeholder='Message Here'
                    className='mb-3 capitalize'  
                    value={ replyBody.message }
                    disabled={ isSaving }                     
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    onChange={ (e) => setReplyBody({ ...replyBody, message: e.target.value }) }
                />

                <button 
                    className="bg-white border-2 text-blue-500 rounded-lg p-3 mt-5 block w-full"
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
                    { isSaving ? "SENDING..." : "SEND" }
                </button>

            </Modal>
        </>
)}

const sendEmailMessage = async (reqBody, sendTo) => {
    const response = await fetch('/client/sendMail/' + sendTo, {
        method: "POST",
        body: reqBody,
        headers: { "Content-Type": "application/json" }
    })

    const data = await response.json();
    return data;
}

export default ReplyActionDocument