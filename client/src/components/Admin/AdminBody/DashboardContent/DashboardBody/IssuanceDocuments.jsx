import { useState, useEffect } from 'react'
import { Table } from 'antd';
import { HourglassOutlined, LoadingOutlined, FileDoneOutlined, IssuesCloseOutlined } from '@ant-design/icons'

const { Column } = Table;

const IssuanceDocuments = () => {
    const [report, setReport] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        browseDocuments()
            .then(data => {
                const filterPending = data.data.filter(document => document.status === 'pending');
                const filterProcessing = data.data.filter(document => document.status === 'processing');
                const filterCompleted = data.data.filter(document => document.status === 'completed');
                const filterCancel = data.data.filter(document => document.status === 'cancel');
                const total = data.data.length;

                const myRep = {
                    pending: filterPending.length,
                    processing: filterProcessing.length,
                    completed: filterCompleted.length,
                    cancel: filterCancel.length,
                    total: total
                }

                setReport(myRep);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {

        if (report) {
            const xData = [
                {
                    key: "1",
                    report: <div className='flex items-center'>
                        <div>
                            <HourglassOutlined className="px-3 rounded-full bg-yellow-500"
                                style={{
                                    color: "white",
                                    fontSize: "22px",
                                    padding: "8px",
                                }} />
                        </div>
                        <div className='flex items-center'>
                            <p className="text-neutral-900 text-subbody font-medium ml-6">
                                {report.pending || "0"}
                            </p>
                        </div>
                    </div>,
                    status: <div>
                        <p
                            className="bg-yellow-500 text-caption rounded-lg text-white font-medium text-center py-1"
                        >
                            Pending
                        </p>
                    </div>
                },
                {
                    key: "2",
                    report: <div className='flex items-center'>
                        <div>
                            <LoadingOutlined className="px-3 rounded-full bg-violet-500"
                                style={{
                                    color: "white",
                                    fontSize: "22px",
                                    padding: "8px",
                                }} />
                        </div>
                        <div className='flex items-center'>
                            <p className="text-neutral-900 text-subbody font-medium ml-6">{report.processing || "0"}</p>
                        </div>
                    </div>,
                    status: <div>
                        <p
                            className="bg-violet-500 text-caption rounded-lg text-white font-medium text-center py-1"
                        >
                            Processing
                        </p>
                    </div>
                },
                {
                    key: "3",
                    report: <div className='flex items-center'>
                        <div>
                            <FileDoneOutlined className="px-3 rounded-full bg-green-500"
                                style={{
                                    color: "white",
                                    fontSize: "22px",
                                    padding: "8px",
                                }} />
                        </div>
                        <div className='flex items-center'>
                            <p className="text-neutral-900 text-subbody font-medium ml-6">{report.completed || "0"}</p>
                        </div>
                    </div>,
                    status: <div>
                        <p
                            className="bg-green-500 text-caption rounded-lg text-white font-medium text-center py-1"
                        >
                            Completed
                        </p>
                    </div>
                },
                {
                    key: "4",
                    report: <div className='flex items-center'>
                        <div>
                            <IssuesCloseOutlined className="px-3 rounded-full bg-red-500"
                                style={{
                                    color: "white",
                                    fontSize: "22px",
                                    padding: "8px",
                                }} />
                        </div>
                        <div className='flex items-center'>
                            <p className="text-neutral-900 text-subbody font-medium ml-6">{report.cancel || "0"}</p>
                        </div>
                    </div>,
                    status: <div>
                        <p
                            className="bg-red-500 text-caption rounded-lg text-white font-medium text-center py-1"
                        >
                            Cancelled
                        </p>
                    </div>
                },
                {
                    key: "5",
                    report: <div className='flex items-center'>
                        <div>
                            <IssuesCloseOutlined className="px-3 rounded-full bg-blue-500"
                                style={{
                                    color: "white",
                                    fontSize: "22px",
                                    padding: "8px",
                                }} />
                        </div>
                        <div className='flex items-center'>
                            <p className="text-neutral-900 text-subbody font-medium ml-6">{report.total || "0"}</p>
                        </div>
                    </div>,
                    status: <div>
                        <p
                            className="bg-blue-500 text-caption rounded-lg text-white font-medium text-center py-1"
                        >
                            Total
                        </p>
                    </div>
                }
            ]

            setData(xData)
        }
        // eslint-disable-next-line
    }, [report])

    return (

        !report || !data ?
            <div className='flex items-center justify-center p-5 font-semibold text-xl'>
                Loading...
            </div>
            :
            <div className="my-5">
                <div className='grid px-5'>
                    <p className="text-neutral-900 text-subbody font-semibold my-3">
                        Issuance Documents
                    </p>
                    <Table
                        bordered={true}
                        dataSource={data}
                        title={false}
                        pagination={false}
                        size='middle'
                    >
                        <Column
                            title={
                                <p
                                    className='font-medium text-caption text-neutral-900'
                                    style={{ margin: 0 }}> Issuance Documents
                                </p>
                            }
                            dataIndex="report"
                            key="report"

                        />

                        <Column
                            title={
                                <p
                                    className='font-medium text-caption  text-neutral-900'
                                    style={{ margin: 0 }}> Status
                                </p>
                            }
                            dataIndex="status"
                            key="status"

                        />
                    </Table>
                </div>
            </div>
    )
}

const browseDocuments = async () => {
    const response = await fetch("/document");
    const listDocuments = response.json();
    return listDocuments;
}

export default IssuanceDocuments