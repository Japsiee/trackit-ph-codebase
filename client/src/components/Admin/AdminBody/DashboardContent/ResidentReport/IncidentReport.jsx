import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import ViewActionIncident from '../TableActions/ViewActionIncident';
// import SearchBar from '../SearchBar';
import ReplyActionIncident from '../TableActions/ReplyActionIncident';
import ToggleActionIncident from '../TableActions/ToggleActionIncident';


const IncidentReport = () => {

  const [listIncident, setListIncident] = useState(null);

  useEffect(() =>
    browseIncident()
      .then(data => { console.log(data); setListIncident(data.data) })
      .catch(err => {
        console.log(err)
      })
    , [])
  // Data Table
  const columns = [
    {
      title: 'Incident No',
      width: 150,
      dataIndex: '_id',
      key: '_id',
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
      sorter: (a, b) => a.name.localeCompare(b.name),

    },
    {
      title: 'Date of Incident',
      width: 200,
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: "true",
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      render: date => (
        <p>
          {date.slice(0, 10)}
        </p>
      )
    },
    {
      title: 'Subject',
      className: 'capitalize',
      width: 200,
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: "true"

    },
    {
      title: 'Emergency Needs',
      width: 250,
      dataIndex: 'emergencyNeeds',
      key: 'emergencyNeeds',
      render: (value) => (
        <div>
          {!value || !value.length ?
            <span className="uppercase text-red-500">No emergency needs</span>
            :
            value.map((val, i) => (
              <span className="uppercase text-green-500">{value.length === i + 1 ? val.item + ' ' : val.item + ', '}</span>
            ))}
        </div>
      )
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
      title: "Incident's Place",
      className: 'capitalize',
      width: 200,
      dataIndex: 'location',
      key: 'location',
      ellipsis: "true"
    },
    {
      title: "Proof of Incident",
      width: 200,
      dataIndex: 'proofOfIncident',
      key: 'proofOfIncident',
      ellipsis: "true"
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (id, report) => <div className="flex justify-around">

        {/* Toggle Modal */}
        <ToggleActionIncident record={report} />
        {/* View Modal */}
        <ViewActionIncident report={report} />
        {/* Reply Modal */}
        <ReplyActionIncident record={report} />
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
            <p className="py-2 px-2 rounded-lg text-neutral-900 text-subbody font-medium">Barangay Cupang West Incident Report</p>
          </div>
           {/* <SearchBar /> */} <div></div>
        </div>

        <div className='rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)]'>
          <div className="justify-between bg-white">
            <Table columns={columns} dataSource={listIncident}
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

const browseIncident = async () => {
  const response = await fetch("/incident")
  const browseIncident = response.json()
  return browseIncident
}

export default IncidentReport