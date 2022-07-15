import React from 'react'
import Statistics1 from "./DashboardContent/DashboardBody/Statistics1";
// import Statistics2 from "./DashboardContent/DashboardBody/Statistics2";
// import Statistics3 from "./DashboardContent/DashboardBody/Statistics3";
import IncidentReport from '../AdminBody/DashboardContent/DashboardBody/IncidentReport'
import IssuanceDocuments from '../AdminBody/DashboardContent/DashboardBody/IssuanceDocuments'
import ComplaintReport from '../AdminBody/DashboardContent/DashboardBody/ComplaintReport'

const DashboardBody = () => {
    return(
    <>
        <div className="flex items-center justify-center p-3 w-full col-span-3">
            <Statistics1 />
        </div>
        <div 
            className="grid grid-cols-3 grid-rows-auto overflow-hidden bg-gray-50 gap-10 "
            style={{
                padding: "20px"
            }}
        >

            
            {/* <div 
                className="box row-start-1 row-end-4 col-start-1 col-end-3 rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)] bg-white ml-10" 
                style={{ padding: "20px" }}
            >
                <Statistics1 />
            </div> */}

            {/* <div 
                className="box row-start-2 row-end-4 col-start-1 col-end-3 rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)] bg-white ml-10" 
                style={{ padding: "20px" }}
            >
                <Statistics2 />
            </div> */}

            {/* <div 
                className="box row-start-3 row-end-4 col-start-1 col-end-3 rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)] bg-white ml-10" 
                style={{ padding: "20px" }}
            >
                <Statistics3 />
            </div> */}

            <div 
                className="col-span-1 rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)] bg-white"
            >
                <IncidentReport />
            </div>

            <div 
                className="col-span-1 rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)] bg-white" 
            > 
                <IssuanceDocuments />
            </div>

            <div className="col-span-1 rounded-lg drop-shadow-[0_5px_5px_rgba(0,0,0,0.10)] bg-white" 
            > 
                <ComplaintReport />
            </div>
        </div>
    </>
    )
}

export default DashboardBody