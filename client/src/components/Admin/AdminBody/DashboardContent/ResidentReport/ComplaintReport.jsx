import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Table } from 'antd';
import ViewActionComplaint from '../TableActions/ViewActionComplaint';
// import SearchBar from '../SearchBar';
import ToggleActionComplaint from '../TableActions/ToggleActionComplaint';


const ComplaintReport = () => {

  const [listComplaint, setListComplaint] = useState(null)

  useEffect(() =>
    browseComplaint()
      .then(data => {
        setListComplaint(data.data)
      })
      .catch(err => {
        console.log(err)
      })
  )
  // Data Table
  const columns = [
    {
      title: 'Complaint No',
      width: 150,
      dataIndex: '_id',
      key: 'id',
      fixed: 'left',
      ellipsis: true,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Full Name',
      className: 'capitalize',
      width: 250,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      ellipsis: "true",
      sorter: (a, b) => a.name.localeCompare(b.name)

    },
    {
      title: 'Date Reported',
      width: 200,
      dataIndex: 'createdAt',
      key: 'createdAt',
      fixed: "left",
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      render: date => (
        <p>
          {date.slice(0, 10)}
        </p>
      )
    },
    {
      title: 'Subject',
      width: 200,
      className: 'capitalize',
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: "true"
    },
    {
      title: 'Details',
      width: 200,
      dataIndex: 'detail',
      key: 'detail',
      ellipsis: "true"
    },
    {
      title: 'Email',
      width: 200,
      dataIndex: 'email',
      key: 'email',
      ellipsis: "true"
    },
    {
      title: 'Contact',
      width: 200,
      dataIndex: 'contact',
      key: 'contact',
      ellipsis: "true"
    },
    {
      title: "Complainee's Name",
      className: 'capitalize',
      width: 200,
      dataIndex: 'complaineeName',
      key: 'complaineeName',
      ellipsis: "true"
    },
    {
      title: "Complainee's Place",
      className: 'capitalize',
      width: 300,
      dataIndex: 'complaineeLocation',
      key: 'complaineeLocation',
      ellipsis: "true"
    },
    {
      title: "Proof of Complaint",
      width: 300,
      dataIndex: 'proofOfComplaint',
      key: 'proofOfComplaint',
      ellipsis: "true"
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (id, report) => <div className="flex justify-around">

        {/* Toggle Modal */}
        <ToggleActionComplaint record={report} />
        {/* View Modal */}
        <ViewActionComplaint report={report} />
        {/* Reply Modal */}
        {/* <ReplyAction /> */}
        {/* Delete Modal */}
        {/* <DeleteAction /> */}

      </div>
    },
  ];

  return (
    <>
      {/*Search Bar*/}
      <div className="py-5 px-10 rounded-lg bg-gray-50">
        <div className='flex pb-5 justify-between'>
          <div>
            <p className="py-2 px-2 rounded-lg text-neutral-900 text-subbody font-medium">Barangay Cupang West Complaint Report</p>
          </div>
        {/* <SearchBar /> */} <div></div>
        </div>

        <div className='rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)]'>
          <div className="justify-between bg-white" >
            <Table columns={columns} dataSource={listComplaint}
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

const browseComplaint = async () => {
  const response = await fetch("/complaint")
  const listComplaint = response.json()
  return listComplaint
}


export default ComplaintReport