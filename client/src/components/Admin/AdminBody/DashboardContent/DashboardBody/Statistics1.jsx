import React, { Component } from 'react';
import Chart from 'chart.js/auto';

export default class Statistics1 extends Component {
	constructor(props) {
		super(props);

		this.state = { documents: [], announcements: [], complaints: [], incidents: [] }
	}

	chartRef = React.createRef();

	componentDidMount() {
		this.fetchAll()				
	} 	

	async fetchAll() {
		const response = await fetch('/all');
		const result = await response.json();
		
		this.doTheThing(result)
	}

	doTheThing(data) {
		if (data) {
			const types = ['announcements', 'documents', 'incidents', 'complaints']			
			for (let i = 0; i < types.length; i++) {				
				let januaryCounter = 0;
				let februaryCounter = 0;
				let marchCounter = 0;
				let aprilCounter = 0
				let mayCounter = 0;
				let juneCounter = 0;
				let julyCounter = 0;
				let augustCounter = 0;
				let septemberCounter = 0;
				let octoberCounter = 0;
				let novemberCounter = 0;
				let decemberCounter = 0;

				data.data[types[i]].forEach(tp => {
					const monthAnnouncementWasMade = tp.createdAt.split('-')[1]

					switch (monthAnnouncementWasMade) {
						case '01':
							januaryCounter += 1;	
							break;
						case '02':
							februaryCounter += 1;	
							break;
						case '03':
							marchCounter += 1;	
							break;
						case '04':
							aprilCounter += 1;	
							break;
						case '05':
							mayCounter += 1;	
							break;
						case '06':
							juneCounter += 1;	
							break;
						case '07':
							julyCounter += 1;	
							break;
						case '08':
							augustCounter += 1;	
							break;
						case '09':
							septemberCounter += 1;	
							break;
						case '10':
							octoberCounter += 1;	
							break;
						case '11':
							novemberCounter += 1;	
							break;
						case '12':
							decemberCounter += 1;	
							break;				
						default:

							break;
					}
				})

				this.setState({
					...this.state,
					[types[i]]: [
						januaryCounter, 
						februaryCounter, 
						marchCounter,
						aprilCounter,
						mayCounter,
						juneCounter,
						julyCounter,
						augustCounter,
						septemberCounter,
						octoberCounter,
						novemberCounter,
						decemberCounter
					]
				})
			}

		}

		const { announcements, complaints, documents, incidents } = this.state;
		
		const ctx = this.chartRef.current.getContext("2d");
		
		new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				datasets: [{ 
					data: announcements,
					label: "Announcements",
					borderColor: "#3e95cd",
					backgroundColor: "#7bb6dd",
					fill: false,
				}, { 
					data: documents,
					label: "Documents",
					borderColor: "#3cba9f",
					backgroundColor: "#71d1bd",
					fill: false,
				}, { 
					data: complaints,
					label: "Complaints",
					borderColor: "#ffa500",
					backgroundColor:"#ffc04d",
					fill: false,
				}, { 
					data: incidents,
					label: "Incidents",
					borderColor: "#c45850",
					backgroundColor:"#d78f89",
					fill: false,
				}
				]
			},
		});
	}

	render() {
		return (
			<div className='w-5/6 my-5'>
				<canvas
				id="myChart"
				ref={this.chartRef}
				/>
			</div>
			)
	}
}