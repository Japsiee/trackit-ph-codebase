import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { Table } from 'antd';
// import DeleteAction from './DashboardContent/TableActions/DeleteAction'
import ViewActionIssuance from './DashboardContent/TableActions/ViewActionIssuance';
import ToggleAction from './DashboardContent/TableActions/ToggleAction'
// import SearchBar from "./DashboardContent/SearchBar"
import ReplyActionDocument from './DashboardContent/TableActions/ReplyActionDocument';

const DocumentIssuanceBody = () => {
  const [listDocuments, setListDocuments] = useState(null);

  useEffect(() => {
    browseDocuments()
      .then(data => {
        setListDocuments(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  })

  // Data Table
  const columns = [
    {
      title: 'Issuance No',
      width: 150,
      dataIndex: '_id',
      key: 'id',
      fixed: 'left',
      sorter: (a, b) => a.id - b.id,
      ellipsis: 'true'
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
      title: 'Document Type',
      className: 'capitalize',
      width: 200,
      dataIndex: 'typeOfDocument',
      key: 'documentType',
      fixed: 'left',
      ellipsis: "true"
    },
    {
      title: 'Date Requested',
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
      title: 'Message',
      width: 300,
      dataIndex: 'message',
      key: 'message',
      ellipsis: "true"
    },
    {
      title: 'Contact',
      width: 300,
      dataIndex: 'contact',
      key: 'contact',
      ellipsis: "true"
    },
    {
      title: 'Email',
      width: 300,
      dataIndex: 'email',
      key: 'email',
      ellipsis: "true"
    },
    {
      title: "Type of ID",
      width: 300,
      className: 'capitalize',
      dataIndex: 'typeOfID',
      key: 'typeOfID',
      ellipsis: "true"
    },
    {
      title: "Front ID",
      width: 300,
      dataIndex: ['proofOfID', 'uno'],
      key: 'proofOfID',
      ellipsis: "true",
    },
    {
      title: "Back ID",
      width: 300,
      dataIndex: ['proofOfID', 'dos'],
      key: 'proofOfID',
      ellipsis: "true"
    },
    {
      title: "Authorization Letter",
      width: 300,
      dataIndex: 'authorizationLetter',
      key: 'authorizationLetter',
      ellipsis: "true"
    },
    {
      title: 'Action',
      dataIndex: '_id',
      fixed: 'right',
      key: '_id',
      width: 200,
      render: (id, document) => (
        <div className="flex justify-around items-center">
          {/* Toggle Modal */}
          <ToggleAction docs={document} />
          {/* View Modal */}
          <ViewActionIssuance document={document} />
          {/* Reply Modal */}
          <ReplyActionDocument record={document} />
          {/* Delete Modal */}
          {/* <DeleteAction />                           */}
        </div>
      )
    },
  ];


  return (
    <>
      {
        !listDocuments ?
          ""
          :
          <>
            {/*Search Bar*/}
            <div className="py-5 px-10 rounded-lg bg-gray-50">
              <div className='flex pb-5 justify-between'>
                <div>
                  <p className="py-2 px-2 rounded-lg text-neutral-900 text-subbody font-medium">Barangay Cupang West Document Issuance</p>
                </div>
                {/* <SearchBar /> */} <div></div>
              </div>

              <div className='rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)]'>
                <div className="justify-between bg-white">
                  <Table columns={columns} dataSource={listDocuments}
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
      }
    </>
  )
}

const browseDocuments = async () => {
  const response = await fetch("/document");
  const listDocuments = response.json();
  return listDocuments;

}


export default DocumentIssuanceBody