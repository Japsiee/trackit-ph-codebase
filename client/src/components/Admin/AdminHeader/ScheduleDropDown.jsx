import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Menu, Dropdown, Drawer, Button, Radio, message } from 'antd';
import {useState} from 'react'
import AdminClock from './AdminClock';
import {Modal, Input, Form, DatePicker, Space} from 'antd'

import {CaretDownOutlined, CalendarOutlined, EyeOutlined} from '@ant-design/icons'

const ScheduleDropDown = () =>{
    const [fetchedSchedule, setFetchedSchedule] = useState(null);
    const [schedID, setSchedID] = useState('');

    useEffect(() => {
        listSchedule()
            .then(data => {
                setFetchedSchedule(data.listSchedule);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
     
/* Start of Schedule DropDown*/
  const schedule = (
    <Menu style={{ padding: 0 }}>
        <Menu.Item className='hover:text-blue-500' style={{ margin: 0 , padding:"10px 15px"}} key="1">
            <Link 
                to="" 
                onClick={ e => {
                    e.preventDefault();
                    scheduleModal();
                }}
            >
                <div className='flex justify-start items-center hover:text-blue-500'>
                    <CalendarOutlined />
                    <span className="ml-3">
                        Create Schedule
                    </span>
                </div>
            </Link>
        </Menu.Item>
        <Menu.Item className='hover:text-blue-500' style={{ margin: 0 , padding:"10px 15px"}} key="2">
            <Link 
                to="/" 
                onClick={ e => {
                    e.preventDefault();
                    showDrawer();
                }}
            >
                <div className='flex justify-start items-center hover:text-blue-500'>
                    <EyeOutlined />
                    <span className="ml-3">
                        View Schedule
                    </span>
                </div> 
            </Link>
        </Menu.Item>
    </Menu>
  );
/* End of Schedule DropDown*/


/* Start of Create Schedule Modal */
  const [form] = Form.useForm();

  const [visibleSchedule, setVisibleSchedule] = React.useState(false);
  const [, setModalTextSchedule] = React.useState(null);

  const scheduleModal = () => {
      setModalTextSchedule("");
      setVisibleSchedule(true);
  };

  const scheduleOk = async (value) => {
    try {
        if (value) {
            const reqBody = JSON.stringify({
                title: value.title,
                date: value.date._d
            });
    
            const response = await fetch('/schedule', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: reqBody
            })
    
            const postSchedule = await response.json();
    
            if (postSchedule) {
                message.success(
                    <div className='flex items-center font-normal mt-3 text-green-500'>
                        Schedule posted
                    </div>, 2
                );

                setVisibleSchedule(false);

                listSchedule()
                    .then(data => {
                        console.log(data)
                        setFetchedSchedule(data.listSchedule);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }        
    } catch(error) {
        message.error(
            <div className='flex items-center font-normal mt-3 text-red-500'>
                Something went wrong please try again in a minute
            </div>, 5
        );

        setVisibleSchedule(false);
    }
  };
  
  const scheduleCancel = () => {
      setVisibleSchedule(false);
  };
  const onReset = () => {
      form.resetFields();
    };

/* End of Create Schedule Modal */

/* Start of Modify Schedule Modal */

  const [visibleScheduleModify, setVisibleScheduleModify] = React.useState(false);
  const [, setModalTextScheduleModify] = React.useState(null);

  const scheduleModalModify = () => {
      setModalTextScheduleModify("");
      setVisibleScheduleModify(true);
  };

  const scheduleOkModify = async (value) => {
    try {
        const reqBody = {
            title: value.title,
            date: value.date._d
        }
    
        if (value) {
            const result = await updateSchedule(schedID, reqBody);
            
            if (result) {
                message.success(
                    <div className='flex items-center font-normal mt-3 text-green-500'>
                        Schedule updated
                    </div>, 2
                );
                setVisibleScheduleModify(false);
    
                listSchedule()
                    .then(data => {

                        setFetchedSchedule(data.listSchedule);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    } catch(error) {
        console.log(error);
    }
  };
  
  const scheduleCancelModify = () => {
      console.log('Clicked cancel button');
      setVisibleScheduleModify(false);
  };

/* End of Modify Schedule Modal */

/* Start of Delete Action Modal */

    //   const deleteModal = () => {
    //     setModalTextDelete("Do you really want to delete this data?");
    //     setVisibleDelete(true);
    //   };


/* End of Delete Action Modal */

/* Start of Main Scheduler */

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
    const onCloseDrawer = () => {
      setVisible(false);
    };

    const selectSchedID = e => {
        setSchedID(e.target.value);
    };

    const [disable, setDisable] = useState(false)

    const disableButton = () => {
        setDisable(prev=>!disable)
    }

    const label = disable ? 'Disable': 'Enable';    


/* End of Main Scheduler */


    const deleteOK = () => {
        deleteSchedule(schedID)
            .then(() => {
                setVisibleScheduleModify(false);

                listSchedule()
                    .then(data => {
                        setFetchedSchedule(data.listSchedule);
                    })
                    .catch(error => {
                        console.log(error);
                    })  
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        !fetchedSchedule ? 
        ""
        :
        <>
{/* Start of Schedule Drop Down*/}
            <Dropdown 
              overlay={schedule} 
              placement='bottomCenter' 
              className='flex justify-center items-center text-white'
              trigger={['click']} 
            >
              <Link 
                to=""
                onClick={ e => e.preventDefault() }
              >
                <i className="far fa-calendar" />
                <span className="px-3">
                  Schedule
                </span>
                <CaretDownOutlined />
              </Link>
            </Dropdown>
{/*End of Schedule Drop Down*/}
{/*Start of Create Schedule Modal*/}
            <Modal
                title={<p className="text-blue-500 text-xl" style={{ margin: 0 }}> Create Schedule </p>}
                visible={visibleSchedule}
                onCancel={scheduleCancel}
                destroyOnClose={true}
                width={600}
                centered
                onClick={scheduleOk}
                keyboard={true}
                footer={ false }>
                <div>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFinish={scheduleOk}
                    >
                        
                        <p className="text-neutral-900 mr-3 mb-2 font-semibold"> Select Title: </p>
                        <Form.Item
                            style={{
                                margin: "0 0 10px 0",
                                lineHeight: 0
                            }}
                            name="title"                     
                            rules={[{ required: true, message: 'Please input your title!' }]}
                        >
                            <Input className="capitalize" placeholder='Schedule Title'/>
                        </Form.Item>
                    
                    
                    
                        <p className="text-neutral-900 mr-3 mb-2 font-semibold"> Select Date: </p>
                        <Form.Item
                            name="date"
                            style={{
                                margin: "0 0 10px 0",
                                lineHeight: 0,
                                display: "flex"
                            }}
                            rules={[{ required: true, message: 'Please input your date!' }]}
                        >
                            <DatePicker format="YYYY-MM-DD"/>
                        </Form.Item>
                        
                        <div className="flex justify-end">
                            <Form.Item 
                                style={{
                                    margin: 0,
                                    lineHeight: 0,
                                }}
                            >
                                <Space>
                                    <Button htmlType="reset" onClick={onReset}>
                                        Reset
                                    </Button>
                                    <Button htmlType="submit" className='bg-blue-500 text-white'>
                                        Create Schedule
                                    </Button>
                                </Space>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal>
{/*End of Create Schedule Modal*/}

{/*Start of Modify Schedule Modal*/}
            <Modal
                title={<p className="text-blue-500 text-xl" style={{ margin: 0 }}> Modify Schedule </p>}
                visible={visibleScheduleModify}
                onCancel={scheduleCancelModify}
                destroyOnClose={true}
                width={600}
                style={{top:"150px"}}
                onClick={scheduleOkModify}
                keyboard={true}
                footer={ false }>
                        <div>
    
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFinish={scheduleOkModify}
                    >
                        
                        <p className="text-neutral-900 mr-3 mb-2 font-semibold"> Select Title: </p>
                        <Form.Item
                            style={{
                                margin: "0 0 10px 0",
                                lineHeight: 0
                            }}
                            name="title"                     
                            rules={[{ required: true, message: 'Please input your title!' }]}
                        >
                            <Input className="capitalize" placeholder='Schedule Title'/>
                        </Form.Item>
                                                        
                        <p className="text-neutral-900 mr-3 mb-2 font-semibold"> Select Date: </p>
                        <Form.Item
                            name='date'
                            style={{
                                margin: "0 0 10px 0",
                                lineHeight: 0,
                                display: "flex"
                            }}
                            rules={[{ required: true, message: 'Please input a date!' }]}
                        >
                            <DatePicker format="YYYY-MM-DD"/>
                        </Form.Item>
                        
                        <div className="flex justify-end">
                            <Form.Item 
                                style={{
                                    margin: 0,
                                    lineHeight: 0,
                                }}
                            >
                                <Space>
                                    <Button htmlType="button" className='bg-blue-500 text-white' onClick={ deleteOK }>
                                        Delete
                                    </Button>
                                    <Button htmlType="submit" className='bg-blue-500 text-white'>
                                        Modify Schedule
                                    </Button>
                                </Space>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal>
{/*End of Modify Schedule Modal*/}

{/*Start of Main Scheduler Modal*/}

            <Drawer
                placement="right" 
                onClose={onCloseDrawer} 
                visible={visible}
                footer={<div className='flex justify-between py-4'>

                    <Button onClick={scheduleModal}>
                        <p className="px-2 rounded-lg text-blue-500"> Create </p>
                    </Button>
                            
                    <Button onClick={disableButton}>
                        <p className="px-2 rounded-lg text-blue-500">{label}</p>
                    </Button>
                    {
                        !disable ?
                        ""
                        :
                        <Button onClick={scheduleModalModify}>
                            <p className="px-2 rounded-lg text-blue-500"> Modify </p>
                        </Button>
                    }
                </div>}
                title={false}
                closeIcon={false}
          >
          <div className='w-full text-center items-center rounded'>
            <p className='text-5xl text-blue-500'> <AdminClock /> </p>
          </div>
            <p className="text-neutral-900 mt-10 mb-2 font-semibold tracking-tighter">
                BARANGAY SCHEDULES 
            </p>
            {
            
            fetchedSchedule.map((sched, i) =>(
                <div className='shadow mb-5' key={ i }>
                    <div>
                        <div className='text-neutral-900 p-2 bg-gray-50 font-medium' key={sched._id}> {sched.date.slice(0,10)} </div>
                    </div>
                    <div className="flex justify-between items-center p-2">
                        <p className='capitalize'>
                            { sched.title }
                        </p>
                        <div>
                            <Radio.Group onChange={ selectSchedID } value={ schedID }>
                                <Radio value={sched._id} disabled={!disable} ></Radio>
                            </Radio.Group>                    
                        </div>
                    </div>
                </div> 
            ))}
          </Drawer>
{/*End of Main Scheduler Modal*/}
        </>
    )
}

const listSchedule = async () => {
    const response = await fetch('/schedule');
    const data = await response.json();
    return data;
}

const updateSchedule = async (id, reqBody) => {
    const response = await fetch('/schedule/' + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody)
    })
    const data = await response.json();
    return data;
}

const deleteSchedule = async (id) => {
    const response = await fetch('/schedule/' + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    const data = await response.json();
    return data;
}

export default ScheduleDropDown