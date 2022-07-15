import { useState, useEffect } from 'react'
import { Table } from 'antd';
// import DeleteAction from '../TableActions/DeleteAction';
import ReplyAction from '../TableActions/ReplyAction';
import ViewConfirmationAction from '../TableActions/ViewConfirmationAction';
// import SearchBar from '../SearchBar';

const ResidentRequest = () => {
  const [residents, setResidents] = useState(null);

  const browseClient = async () => {
    const result = await fetch('/client');
    const data = await result.json();
    return data;
  }

  useEffect(() => {
    browseClient()
      .then(data => {
        const filteredResidents = data.data.filter(person => {
          return !person.approved;
        })

        const addingKeys = filteredResidents.map(resident => {
          const newResident = {
            ...resident,
            _id: resident._id,
            key: resident._id,
            fullname: resident.attr.name,
            birthdate: resident.attr.birthdate,
            address: resident.attr.address
          }

          return newResident;
        })

        setResidents(addingKeys);
      })
      .catch(err => {
        console.log(err);
      })
    // eslint-disable-next-line
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: value => (<span>{value.slice(0, 5) + '...'}</span>)
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: 'Birthdate',
      dataIndex: 'birthdate',
      key: 'birthdate'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (value) => (<span>{value.slice(0, 20) + "..."}</span>)
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (value, record) => <div className="flex justify-around">
        {/* View Modal */}
        <ViewConfirmationAction record={record} />
        {/* Reply Modal */}
        <ReplyAction record={record} />
        {/* Delete Modal */}
        {/* <DeleteAction record={ record._id } />*/}
      </div>
    },
  ];

  return (
    <>
      {/*Search Bar*/}
      <div className="py-5 px-10 rounded-lg bg-gray-50">
        <div className='flex pb-5 justify-between'>
          <div>
            <p className="py-2 px-2 rounded-lg text-neutral-900 text-subbody font-medium">Barangay Cupang West Resident Request</p>
          </div>
           {/* <SearchBar /> */} <div></div>
        </div>

        <div className='rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)]'>
          <div className="justify-between bg-white">
            <Table
              style={{ margin: "0 0 40px 0" }}
              columns={columns}
              dataSource={residents}
              pagination={{
                position: ["bottomCenter"],
                pageSizeOptions: ["10"]
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ResidentRequest