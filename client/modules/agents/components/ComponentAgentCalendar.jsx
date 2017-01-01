import React from 'react';

function CalendarCell(props) {
	
	const scheduleDates = props.scheduleDates;
	let elementToRender = null;
	
	let cssClass = "";
	
	for (var i = 0; i < scheduleDates.length; i++) {
		if (scheduleDates[i].Date === props.day.year + "/" + props.day.month + "/" + props.day.date) {
			if (scheduleDates[i].Availability === "Available") {
				cssClass = "available-date";
			}
			else if (scheduleDates[i].Availability === "Not Available") {
				cssClass = "not-available-date";
			}
		}
	}
	
	if (props.day.month == props.currentMonth + 1) {
		elementToRender = 	<td className={cssClass} 
								onMouseDown={() => props.onMouseDown()} 
								onMouseEnter={() => props.onMouseEnter()}>
									<span>{props.day.date}</span>
							</td>
	}
	else {
		cssClass = cssClass + " color-fade";
		
		elementToRender = 	<td className={cssClass} 
								onMouseDown={() => props.onMouseDown()} 
								onMouseEnter={() => props.onMouseEnter()}>
									<span>{props.day.date}</span>
							</td>
	}
	
	return elementToRender;
}

function CalendarRow(props) {
	return (
		<tr>
			{props.week.map(day => 
				<CalendarCell 
					key={day.date} 
					day={day} 
					currentMonth={props.currentMonth} 
					scheduleDates={props.scheduleDates} 
					onMouseDown={() => props.onMouseDown(day)} 
					onMouseEnter={() => props.onMouseEnter(day)} />
			)}
		</tr>
	);
}

class ComponentAgentCalendar extends React.Component {
	constructor(props, context) {
		super(props, context);
		
		this.isMouseDown = false;
		this.state = {
			currentMonth: new Date().getMonth(), //jan = 0, feb = 1, ... , dec = 11
			currentYear: new Date().getFullYear(),
			scheduleDates : props.scheduleDates
		};
		
		this.documentMouseDownHandler = this.documentMouseDownHandler.bind(this);
		this.documentMouseUpHandler = this.documentMouseUpHandler.bind(this);
    }
	componentDidMount() {
		window.addEventListener('mousedown', this.documentMouseDownHandler, false);
		window.addEventListener('mouseup', this.documentMouseUpHandler, false);
	}
	prevMonth(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		if (this.state.currentMonth == 0) {
			this.setState({currentMonth : 11});
			this.setState({currentYear : this.state.currentYear - 1});
		}
		else {
			this.setState({currentMonth : this.state.currentMonth - 1});
		}
	}
	nextMonth(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		if (this.state.currentMonth == 11) {
			this.setState({currentMonth : 0});
			this.setState({currentYear : this.state.currentYear + 1});
		}
		else {
			this.setState({currentMonth : this.state.currentMonth + 1});
		}
	}
	onSave(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		const scheduleDates = this.state.scheduleDates;
		this.props.onSave(scheduleDates);
	}
	handleMouseDown(day) {
		let dates = this.state.scheduleDates;
		let selectedDate = null;
		let dateIndex = 0;
		
		for (var i = 0; i < dates.length; i++) {
			if (dates[i].Date === day.year + "/" + day.month + "/" + day.date) {
				selectedDate = dates[i];
				dateIndex = i;
				break;
			}
		}
		
		if (selectedDate) {
			if (selectedDate.Availability === "Available") {
				selectedDate.Availability = "Not Available";
				
				if (selectedDate.Availability === selectedDate.OriginalAvailability && selectedDate.RowState === "Modified") {
					selectedDate.RowState = "Unchanged";
				}
				else if (selectedDate.RowState === "Unchanged" || selectedDate.RowState == null) {
					selectedDate.RowState = "Modified";
				}
			}
			else if (selectedDate.Availability === "Not Available") {
				if (selectedDate.RowState === "Added") {
					dates.splice(dateIndex, 1);
				}
				else if (selectedDate.RowState === "Modified") {
					selectedDate.Availability = "Default";
					
					if (selectedDate.Availability === selectedDate.OriginalAvailability) {
						selectedDate.RowState = "Unchanged";
					}
				}
				else if  (selectedDate.RowState === "Unchanged" || selectedDate.RowState == null) {
					selectedDate.Availability = "Default";
					
					selectedDate.RowState = "Modified";
				}
			}
			else if (selectedDate.Availability === "Default") {
				selectedDate.Availability = "Available";
				
				if (selectedDate.Availability === selectedDate.OriginalAvailability && selectedDate.RowState === "Modified") {
					selectedDate.RowState = "Unchanged";
				}
				else if (selectedDate.RowState === "Unchanged" || selectedDate.RowState == null) {
					selectedDate.RowState = "Modified";
				}
			}
		}
		else {
			dates.push({
				Date : day.year + "/" + day.month + "/" + day.date,
				Availability : "Available",
				OriginalAvailability : "Available",
				RowState : "Added"
			})
		}
		
		this.setState({scheduleDates : dates});
	}
	handleMouseEnter(day) {
		if (this.isMouseDown) {
			
			let dates = this.state.scheduleDates;
			let selectedDate = null;
			let dateIndex = 0;
			
			for (var i = 0; i < dates.length; i++) {
				if (dates[i].Date === day.year + "/" + day.month + "/" + day.date) {
					selectedDate = dates[i];
					dateIndex = i;
					break;
				}
			}
			
			if (selectedDate) {
				if (selectedDate.Availability === "Available") {
					selectedDate.Availability = "Not Available";
				}
				else if (selectedDate.Availability === "Not Available") {
					if (selectedDate.RowState === "Added") {
						dates.splice(dateIndex, 1);
					}
					else if (selectedDate.RowState === "Modified") {
						selectedDate.Availability = "Default";
					}
				}
				else if (selectedDate.Availability === "Default") {
					selectedDate.Availability = "Available";
				}
			}
			else {
				dates.push({
					Date : day.year + "/" + day.month + "/" + day.date,
					Availability : "Available",
					RowState : "Added"
				})
			}
			
			this.setState({scheduleDates : dates});
		}
	}
	documentMouseDownHandler(event) {
		this.isMouseDown = true;
	}
	documentMouseUpHandler(event) {
		this.isMouseDown = false;
	}
	render() {
		const monthNames = ["January", "February", "March", "April", "May", "June", 
						    "July", "August", "September", "October", "November", "December"];
						  
		const firstDayOfCurrentMonth = new Date(this.state.currentYear, this.state.currentMonth, 1).getDay();
		const noOfDaysInCurrentMonth = new Date(this.state.currentYear, this.state.currentMonth + 1, 0).getDate();
		
		let calendarDate = [[], [], [], [], [], []];
		let weekNo = 0;
			
		//if sunday 
		if (firstDayOfCurrentMonth == 0) {
			
			for (var i = 1; i <= 42; i++){
				calendarDate[weekNo].push({
					"date": i <= noOfDaysInCurrentMonth ? i : i - noOfDaysInCurrentMonth,
					"month": i <= noOfDaysInCurrentMonth ? this.state.currentMonth + 1 : (this.state.currentMonth == 11 ? 1 : this.state.currentMonth + 2),
					"year": i <= noOfDaysInCurrentMonth ? this.state.currentYear : (this.state.currentMonth == 11 ? this.state.currentYear + 1 : this.state.currentYear )
				});
				
				if (i % 7 == 0) {
					weekNo++;
				}
			}
		}
		else {
			const lastDayOfPreviousMonth = new Date(this.state.currentYear, this.state.currentMonth, 0).getDate();
			let count = 0;
			
			for (var i = firstDayOfCurrentMonth - 1; i >= 0; i--) {
				calendarDate[weekNo].push({
					"date": lastDayOfPreviousMonth - i,
					"month": this.state.currentMonth == 0 ? 12 : this.state.currentMonth,
					"year": this.state.currentMonth == 0 ? this.state.currentYear - 1 : this.state.currentYear
				});
				count++;
			}
			
			for (var i = 1; i <= 42; i++) {
				calendarDate[weekNo].push({
					"date": i <= noOfDaysInCurrentMonth ? i : i - noOfDaysInCurrentMonth,
					"month": i <= noOfDaysInCurrentMonth ? this.state.currentMonth + 1 : (this.state.currentMonth == 11 ? 1 : this.state.currentMonth + 2),
					"year": i <= noOfDaysInCurrentMonth ? this.state.currentYear : (this.state.currentMonth == 11 ? this.state.currentYear + 1 : this.state.currentYear )
				});
				
				count++;
				
				if (count % 7 == 0) {
					weekNo++;
					
					if (i >= 35)
					{
						break;
					}
				}
			}
		}
		
		weekNo = 0;
		
		let scheduleDates = this.state.scheduleDates;
		let scheduleDateRange = [];
		
		for (var i = 0; i < scheduleDates.length; i++) {
			if (scheduleDates[i].Date >= calendarDate[0][0].year + "/" + calendarDate[0][0].month + "/" + calendarDate[0][0].date
				&& scheduleDates[i].Date <= calendarDate[5][6].year + "/" + calendarDate[5][6].month + "/" + calendarDate[5][6].date) {
				scheduleDateRange.push(scheduleDates[i]);
			}
		}
		
		return (
			<div className="calendar-container">
				<div className="row pad-btm-15">
					<div className="col-xs-1 col-sm-1 no-pad" onClick={this.prevMonth.bind(this)}>
						<span>&lt;</span>
					</div>
					<div className="col-xs-1 col-sm-1 no-pad">
					</div>
					<div className="col-xs-6 col-sm-6 no-pad">
						<span>{monthNames[this.state.currentMonth]} {this.state.currentYear}</span>
					</div>
					<div className="col-xs-2 col-sm-2 no-pad" onClick={this.onSave.bind(this)}>
						<span>Save</span>
					</div>
					<div className="col-xs-1 col-sm-1 no-pad">
					</div>
					<div className="col-xs-1 col-sm-1 no-pad" onClick={this.nextMonth.bind(this)}>
						<span>&gt;</span>
					</div>
				</div>
				<div className="calendar row">
					<div className="col-xs-12 col-sm-12">
						<table>
							<colgroup>
								<col span="1" width="14.28%" />
								<col span="1" width="14.28%" />
								<col span="1" width="14.28%" />
								<col span="1" width="14.28%" />
								<col span="1" width="14.28%" />
								<col span="1" width="14.28%" />
								<col span="1" width="14.28%" />
							</colgroup>
							<thead>
								<tr>
									<th><span>Sun</span></th>
									<th><span>Mon</span></th>
									<th><span>Tue</span></th>
									<th><span>Wed</span></th>
									<th><span>Thu</span></th>
									<th><span>Fri</span></th>
									<th><span>Sat</span></th>
								</tr>
							</thead>
							<tbody>
								{calendarDate.map(week => (
									<CalendarRow 
										key={weekNo++} 
										week={week} 
										currentMonth={this.state.currentMonth} 
										scheduleDates={scheduleDateRange} 
										onMouseDown={(day) => this.handleMouseDown(day)} 
										onMouseEnter={(day) => this.handleMouseEnter(day)}/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default ComponentAgentCalendar;
