import React, { Component } from 'react';
import Chart from 'chart.js/auto';

export default class Statistics2 extends Component {

	chartRef = React.createRef();

	componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
		
		new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				datasets: [{ 
					data: [86,114,106,106,107,111,133, 0, 104, 403, 200, 12],
					label: "Announcements",
					borderColor: "#3e95cd",
					backgroundColor: "#7bb6dd",
					fill: false,
				}, { 
					data: [70,90,44,60,83,90,100, 0, 104, 203, 200, 12],
					label: "Documents",
					borderColor: "#3cba9f",
					backgroundColor: "#71d1bd",
					fill: false,
				}, { 
					data: [10,21,60, 0, 104, 105, 200, 12, 44,17,21,17],
					label: "Complaints",
					borderColor: "#ffa500",
					backgroundColor:"#ffc04d",
					fill: false,
				}, { 
					data: [0, 104, 403, 200, 12, 6,3,2,2,7,0,16],
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
			<div>
				<canvas
				id="myChart"
				ref={this.chartRef}
				/>
			</div>
			)
	}
}