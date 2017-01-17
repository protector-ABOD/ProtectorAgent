import React from 'react';
import PopupServiceRequest from './PopupServiceRequest.jsx';

function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}
//or as a Number prototype method:
Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}

function CalendarCell(props) {
	
	let isOccupied = false;

	const acceptedDates = props.acceptedDates;
	let serviceRequest = null;
	let elementToRender = null;
	
	let cssClass = "";
	for (var i = 0; i < acceptedDates.length; i++) {
		if (acceptedDates[i].Date === props.day.year + "/" + props.day.month + "/" + props.day.date) {
			serviceRequest = acceptedDates[i];
			cssClass = "occupied";
			isOccupied = true;
		}
	}
	
	const scheduleDates = props.scheduleDates;

	if (!isOccupied) {
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
	}
	else {
		if (props.day.month == props.currentMonth + 1) {
			elementToRender = 	<td className={cssClass} 
									onClick={() => props.onOccupiedClick(serviceRequest)}>
									<span>{props.day.date}</span>
								</td>
		}
		else {
			cssClass = cssClass + " color-fade";
			
			elementToRender = 	<td className={cssClass} 
									onClick={() => props.onOccupiedClick(serviceRequest)}>
									<span>{props.day.date}</span>
								</td>
		}
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
					acceptedDates={props.acceptedDates} 
					onMouseDown={() => props.onMouseDown(day)} 
					onMouseEnter={() => props.onMouseEnter(day)} 
					onOccupiedClick={(serviceRequest) => props.onOccupiedClick(serviceRequest)} />
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
			scheduleDates : (props.ScheduleDates ? props.ScheduleDates : []),
			isModalOpen: false,
			selectedRequest : null,
			rating : 5
		};
		
		this.documentMouseDownHandler = this.documentMouseDownHandler.bind(this);
		this.documentMouseUpHandler = this.documentMouseUpHandler.bind(this);
    }
	componentDidMount() {
		window.addEventListener('mousedown', this.documentMouseDownHandler, false);
		window.addEventListener('mouseup', this.documentMouseUpHandler, false);
	}
	openModal(serviceRequest) {
		this.setState({ isModalOpen: true, selectedRequest : serviceRequest });
	}
	closeModal() {
		this.setState({ isModalOpen: false, selectedRequest : null });
	}
	onRatingClick(event) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		let rating = parseInt(event.target.getAttribute('data-value'));
		this.setState({ rating: rating });
	}
	completeRequest() {
		
		const {comment} = this.refs;
		const rating = this.state.rating;
		
		let serviceRequest = {};
		
		serviceRequest._id = this.state.selectedRequest._id;
		serviceRequest.Comment_By_Agent = comment.value;
		serviceRequest.Rating_By_Agent = rating;
		
		this.props.OnCompleteRequest(serviceRequest);
		
		this.setState({ isModalOpen: false, selectedRequest: null, rating : 5 });
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
		this.props.OnSave(scheduleDates);
	}
	handleMouseDown(day) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		
		if (Date.parse(yyyy + "/" + mm + "/" + dd) > Date.parse(day.year + "/" + day.month + "/" + day.date)) {
			//disable editing if date selected is less than current date
			return;
		}
		
		let dates = this.state.scheduleDates;
		let selectedDate = null;
		let dateIndex = 0;
		
		if (dates) {
			for (var i = 0; i < dates.length; i++) {
				if (dates[i].Date === day.year + "/" + day.month + "/" + day.date) {
					selectedDate = dates[i];
					dateIndex = i;
					break;
				}
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
			
			var today = new Date();
			var dd = padLeft(today.getDate(), 2);
			var mm = padLeft(today.getMonth()+1, 2);
			var yyyy = today.getFullYear();
			
			if (Date.parse(yyyy + "/" + mm + "/" + dd) > Date.parse(day.year + "/" + day.month + "/" + day.date)) {
				//disable editing if date selected is less than current date
				return;
			}
		
			let dates = this.state.scheduleDates;
			let selectedDate = null;
			let dateIndex = 0;
			
			if (dates) {
				for (var i = 0; i < dates.length; i++) {
					if (dates[i].Date === day.year + "/" + day.month + "/" + day.date) {
						selectedDate = dates[i];
						dateIndex = i;
						break;
					}
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
	}
	onOccupiedClick(serviceRequest) {
		if (event && event.preventDefault) {
		  event.preventDefault();
		}
		
		if (!this.state.isModalOpen) {
			this.openModal(serviceRequest);
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
		
		if (scheduleDates) {
			for (var i = 0; i < scheduleDates.length; i++) {
				if (Date.parse(scheduleDates[i].Date) >= Date.parse(calendarDate[0][0].year + "/" + calendarDate[0][0].month + "/" + calendarDate[0][0].date)
					&& Date.parse(scheduleDates[i].Date) <= Date.parse(calendarDate[5][6].year + "/" + calendarDate[5][6].month + "/" + calendarDate[5][6].date)) {
					scheduleDateRange.push(scheduleDates[i]);
				}
			}
		}

		let serviceRequestsAccepted = this.props.ServiceRequestsAccepted;
		let serviceRequestsAcceptedRange = [];

		if (serviceRequestsAccepted) {
			for (var i = 0; i < serviceRequestsAccepted.length; i++) {
				if (Date.parse(serviceRequestsAccepted[i].Date) >= Date.parse(calendarDate[0][0].year + "/" + calendarDate[0][0].month + "/" + calendarDate[0][0].date)
					&& Date.parse(serviceRequestsAccepted[i].Date) <= Date.parse(calendarDate[5][6].year + "/" + calendarDate[5][6].month + "/" + calendarDate[5][6].date)) {
					serviceRequestsAcceptedRange.push(serviceRequestsAccepted[i]);
				}
			}
		}
		
		let selectedRequest;
		let startDate;
		let createdDate;

		if (this.state.selectedRequest) {
			selectedRequest = this.state.selectedRequest;
			startDate = new Date(selectedRequest.Service_Request.Service_Start_Time);
			createdDate = new Date(selectedRequest.Created_DateTime);
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
										acceptedDates={serviceRequestsAcceptedRange}
										onMouseDown={(day) => this.handleMouseDown(day)} 
										onMouseEnter={(day) => this.handleMouseEnter(day)}
										onOccupiedClick={(serviceRequest) => this.onOccupiedClick(serviceRequest)}/>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<PopupServiceRequest 
					serviceRequest={selectedRequest ? selectedRequest : null}
					isOpen={this.state.isModalOpen} 
					onClose={() => this.closeModal()}
					onCompleteRequest={() => this.completeRequest()}>
						{selectedRequest ?
							<div>
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										{selectedRequest.User.Full_Name}
									</div>
								</div>
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										{selectedRequest.User.Gender}
									</div>
								</div>
								{this.state.selectedRequest.Service_Request_Status === "Accepted" 
									?
										<div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													<div className="rating-star">
														<i className={this.state.rating > 0 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="1" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 1 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="2" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 2 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="3" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 3 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="4" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
													<div className="rating-star">
														<i className={this.state.rating > 4 ? "fa fa-star fw" : "fa fa-star-o fw"} data-value="5" onClick={(event) => this.onRatingClick(event)}></i>
													</div>
												</div>
											</div>
										</div>
									:
									null
								}
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										{selectedRequest.Service_Request.Service_Type_Description}
									</div>
								</div>
								<div className="row pad-btm-15">
									<div className="col-xs-8">
										{padLeft(startDate.getDate(), 2) 
										 + "/" 
										 + padLeft(startDate.getMonth() + 1, 2) 
										 + "/" 
										 + startDate.getFullYear()
										 + " "
										 + padLeft(startDate.getHours(), 2)
										 + ":"
										 + padLeft(startDate.getMinutes(), 2)
										}
									</div>
									<div className="col-xs-4 align-right">
										{selectedRequest.Service_Request.Service_Duration_Value} Hours
									</div>
								</div>
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										{selectedRequest.Service_Request.Service_State_Description}
									</div>
								</div>
								<div className="row pad-btm-15">
									<div className="col-xs-12">
										Remarks
									</div>
								</div>
								
								{this.state.selectedRequest.Service_Request_Status === "Accepted" 
									?
										<div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													Comment
												</div>
											</div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													<textarea ref="comment" className="form-control" />
												</div>
											</div>
										</div>
									:
									null
								}
								{this.state.selectedRequest.Service_Request_Status === "Pending"
									?
										<div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													Remarks
												</div>
											</div>
											<div className="row pad-btm-15">
												<div className="col-xs-12">
													<textarea className="form-control" value={selectedRequest.Service_Remark} readOnly={true} />
												</div>
											</div>
										</div>
									:
									null
								}
							</div>
							:
							null
						}
				</PopupServiceRequest>
			</div>
		);
	}
}

export default ComponentAgentCalendar;
