import React, { useEffect, useState } from 'react'
import { Table, Tooltip } from 'antd';
import DeleteActionAnnouncement from './DashboardContent/TableActions/DeleteActionAnnouncement'
import ViewActionAnnouncements from "./DashboardContent/TableActions/ViewActionAnnouncements"
import AnnouncementModal from './DashboardContent/AnnouncementBody/AnnouncementModal';
import SearchBar from "./DashboardContent/SearchBar"


const AnnouncementBody = () => {
  const [listAnnouncement, setListAnnouncement] = useState(null);

  useEffect(() => {
    browseAnnouncement()
      .then(data => {
        setListAnnouncement(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  // Data Table
  const columns = [
    {
      title: 'Announcement ID',
      dataIndex: '_id',
      width: 200,
      key: '_id',
      fixed: 'left',
      render: id => (
        <Tooltip title={id} key={id}>
          <p>{id.slice(0, 15) + "..."}</p>
        </Tooltip>
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      className: 'capitalize',
      key: 'title',
      width: 200,
      sorter: (a, b) => a.title > b.title ? 1 : -1,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: (description, id) => (
        <p key={id}>{description.slice(0, 40) + "..."}</p>
      )
    },
    {
      title: 'Date Published',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (date, id) => (
        <p key={id}>
          {date.slice(0, 10)}
        </p>
      )
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      key: '_id',
      fixed: 'right',
      width: 100,
      render: (id, announcement) => (
        <div className='flex justify-around w-full' key={id}>
          {/* View Modal */}
          <ViewActionAnnouncements announcement={announcement} />
          {/* Reply Modal */}
          {/* <button>
                <EditOutlined className=' text-blue-500' style={{ fontSize:"20px" }} />
              </button> */}
          {/* Delete Modal */}
          <DeleteActionAnnouncement record={id} />
        </div>
      )
    },
  ];

  return (
    <>
      {/*Search Bar*/}
      <div className="py-5 px-10 rounded-lg bg-gray-50">
        <div className='flex pb-5 justify-between'>
          <div>
            <AnnouncementModal />
          </div>
          <SearchBar />
        </div>

        <div className='rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)]'>
          <div className="justify-between mt-3 bg-white">
            <Table columns={columns} dataSource={listAnnouncement}
              pagination={{
                position: ["bottomCenter"],
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ["20", "50", "100", "200"]
              }} tableLayout={"fixed"} scroll={{ x: 1500, y: 700 }} />
          </div>
        </div>
      </div>
    </>
  )
}

const browseAnnouncement = async () => {
  const response = await fetch('/announcement');
  const listAnnouncement = response.json();
  return listAnnouncement
}

export default AnnouncementBody