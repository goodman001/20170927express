import React, { Component } from 'react';
import './App.css';
/*
Screen:LoginScreen
Loginscreen is the main screen which the user is shown on first visit to page and after
hitting logout
*/
import LoginScreen from './Loginscreen';
import UserPage from './UserPage';
/*
Module:Material-UI
Material-UI is used for designing ui of the app
*/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
/*
Module:Dropzone
Dropzone is used for local file selection
*/
import Dropzone from 'react-dropzone';
/*
Module:superagent
superagent is used to handle post/get requests to server
*/
import TextField from 'material-ui/TextField';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

var request = require('superagent');
/* Note list page */
class DateScreen extends Component {
  constructor(props){
    super(props);
	  console.log(props);
	const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);
	maxDate.setHours(0, 0, 0, 0);
	
    this.state={
      role:this.props.user.role,
      filesPreview:[],
      filesToBeSent:[],
      draweropen:false,
      printcount:10,
      printingmessage:'',
      printButtonDisabled:false,
      user:this.props.user,
	  dateItems:this.props.user.dateItems,
	  dateList:[],//You need get all date list
      notePreview:[],
      newtitle:'',
      newcontent:'',
      userid:this.props.user.id,
      edittitle:'abc',
      editcontent:'ccc',
	  minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      disableYearSelection: false,
	  value24min: null,
	  value24max: null,
	  editmindate:null,
	  editmaxdate:null,
    }
  }
  componentDidMount(){
	  if(this.state.role == "user"){
		  this.renderNotelist(this.state.dateItems);
	  }else //client
	  {
		  
	  }
    
  }
  componentWillMount(){
    
  }
  
  fetchDetails = (e) => {
    const data = e.target.getAttribute('data-item');
    console.log('We need to get the details for ', data);
  }
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  renderNotelist(dateItems){
	var self = this;    
    var notePreview=[];
	console.log(dateItems);
	self.setState({dateItems:dateItems});
    notePreview = this.renderResultTable(dateItems);
    this.setState({notePreview});
    
    this.setState({role:this.props.role,dateItems:dateItems});
  }
  /*show table > tr*/
  renderResultRows(dateItems) {
    var self = this;
    return dateItems.map((data,index) =>{
        return (
            <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
                <td data-title="id">{data.id}</td>
                <td data-title="startdate">{data.startdate}</td>
                <td data-title="enddate">{data.enddate}</td>
				<td data-title="content">
						<RaisedButton label="Edit" primary={true} style={style} onClick={(event) => self.handleNoteEditClick(event,index)}/>
						<RaisedButton label="Delete" primary={true} style={style} onClick={(event) => self.handleNoteDelClick(event,index)}/>
				</td>
            </tr>
        );
    });
  }
  /* show table */
  renderResultTable(data) {
    var self = this;
    return(
		<MuiThemeProvider>
		  <div>
			<div className="noteheader">
			 <center><h3> list</h3></center>
			<RaisedButton  label="NewAppoint" primary={true} style={style1} onClick={(event) => this.handleNoteCreateClick(event)}/>
			</div>
			<div className="notecontainer">
					 <table className="notetable">
					  <tr>
						<th>ID</th>
						<th>StartDate</th>
						<th>EndDate</th>
						<th></th>
					  </tr>
					  <tbody>
					  
						{!this.isEmpty(data)
                        ? this.renderResultRows(data)
                        : ''}
					   </tbody>
					</table>
			 </div>
		   </div>
		  </MuiThemeProvider>
	);
  }
  /*
  clost nav
  */ 
  handleCloseClick(event,index){
    // console.log("filename",index);
    var filesToBeSent=this.state.filesToBeSent;
    filesToBeSent.splice(index,1);
    // console.log("files",filesToBeSent);
    var filesPreview=[];
    for(var i in filesToBeSent){
      filesPreview.push(<div>
        {filesToBeSent[i][0].name}
        <MuiThemeProvider>
        <a href="#" onClick={(event) => this.handleDivClick(event)}><FontIcon
          className="material-icons customstyle"
          color={blue500}
          
        >edit</FontIcon></a>
        </MuiThemeProvider>
        </div>
      )
    }
    this.setState({filesToBeSent,filesPreview});
  }
  handleChangeEditMinDate = (event, date) => {
    this.setState({editmindate: date});
  };
  handleChangeEditMaxDate = (event, date) => {
    this.setState({editmaxdate: date});
  };
  /*
  note edit
  */ 
  handleNoteEditClick(event,i){
    var self = this;
    console.log(i);
    console.log(event.target.getAttribute('data-tag'));
    //this.setState({edittitle:this.state.user.dateItems[i].title});
   // this.setState({editcontent:this.state.user.dateItems[i].content});
    this.state.editmindate = new Date(this.state.dateItems[i].startdate);
    this.state.editmaxdate = new Date(this.state.dateItems[i].enddate);
	console.log(this.state.dateItems[i].startdate);
    var localloginComponent = [];
	localloginComponent.push(
	  <MuiThemeProvider>
		<div>
		 	<div>
			<DatePicker
				onChange={this.handleChangeEditMinDate}
				autoOk={this.state.autoOk}
				floatingLabelText="Min Date time"
				defaultDate={this.state.editmindate}
				disableYearSelection={this.state.disableYearSelection}
			  />
			<TimePicker
			  format="24hr"
			  hintText="24hr Format"
			  value={this.state.editmindate}
			  onChange={this.handleChangeEditMinDate}
			/>
			<DatePicker
				onChange={this.handleChangeEditMaxDate}
				autoOk={this.state.autoOk}
				floatingLabelText="Max Date Time"
				defaultDate={this.state.editmaxdate}
				disableYearSelection={this.state.disableYearSelection}
			  />
			<TimePicker
			  format="24hr"
			  hintText="24hr Format"
			  value={this.state.editmaxdate}
			  onChange={this.handleChangeEditMaxDate}
			/>
			</div>
		   <RaisedButton label="Edit" primary={true} style={style} onClick={(event) => this.handleNoteEditData(event,i)}/>
		   <RaisedButton label="Cancel" primary={true} style={style} onClick={() => this.renderNotelist(this.state.dateItems)}/>
	   </div>
	   </MuiThemeProvider>
	)
     this.setState({notePreview:localloginComponent})
    //this.props.appContext.setState({userPage:userPage,uploadScreen:[]})
    
  }
  /*
   note del click
  */
  handleNoteDelClick(event,i){
    var self = this;
    console.log(i);
    console.log(event.target.getAttribute('data-tag'));
    axios.get('/api/dates/'+this.state.userid+"/items/"+this.state.dateItems[i].id)//api/dates/1/items/1
       .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
         console.log("note delete successfull");
         //console.log(response.data.user);
         //var uploadScreen=[];
         //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
         self.setState({edittitle:""});
         self.setState({editcontent:""});
         alert("Congradulations!Delete date info Successfully!");
		 axios.get('/api/users/'+self.state.userid)//api/notes/1/items/1
		   .then(function (response) {
		   console.log(response);
		   if(response.data.code == 200){
			 console.log("get successfull");
			 //console.log(response.data.user);
			 //var uploadScreen=[];
			 //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
			 self.setState({user:response.data.user});
			 self.setState({dataItems:response.data.user.dateItems});
			   console.log(response.data.user.dateItems);
			 self.renderNotelist(response.data.user.dateItems);
		   }
		   else if(response.data.code == 404){
			 console.log("get fail");
			 //alert(response.data.success)
		   }
		   else{
			 console.log("get fail");
			 //alert("Note update fail");
		   }
		   })
		   .catch(function (error) {
		   console.log(error);
		   });
		 
       }
       else if(response.data.code == 404){
         console.log("Note update fail");
         alert(response.data.success)
       }
       else{
         console.log("Note update fail");
         alert("Note update fail");
       }
       })
       .catch(function (error) {
       console.log(error);
       });
    
  }
  /*
   get input content change
  */
  onTodoChange(value,index,i){
	  console.log(index);
	  var titlev = this.state.edittitle;
	  var contilev = this.state.editcontent;
	  //console.log(this.state.edittitle);
	  if(index == 0){
		titlev = value;
	  }else{
		contilev = value;
	  }
	  var localloginComponent = [];
	  localloginComponent.push(
			  <MuiThemeProvider>
				<div>
				 <TextField
				   type="text"
				   hintText="Enter Note title"
				   value={titlev}
				   floatingLabelText="Title"
				   onChange = {(event,newValue) => this.onTodoChange(newValue,0,i)}
				   />
				 <br/>
				   <TextField
					 type="text"
					 hintText="Enter Note Content!"
					 value = {contilev}
					 floatingLabelText="Content"
					 onChange = {(event,newValue) => this.onTodoChange(newValue,1,i)}
					 />
				   <br/>
				   <RaisedButton label="Create" primary={true} style={style} onClick={(event) => this.handleNoteEditData(event,i)}/>
				   <RaisedButton label="Cancel" primary={true} style={style} onClick={() => this.renderNotelist(this.state.dateItems)}/>
			   </div>
			   </MuiThemeProvider>
			)
	  this.setState({edittitle:titlev});
	this.setState({editcontent:contilev});
	this.setState({notePreview:localloginComponent})
	}
  handleNoteEditData(event,i){
	  var self = this;
	  console.log(this.state.edittitle);
	  console.log(this.state.editcontent);
	  console.log(this.state.dateItems[i]);
	  if(this.state.editmindate != null && this.state.editmaxdate != null) {
		   console.log(this.state.editmindate);
			  var payload={
				"startdate":this.state.editmindate,
				"enddate": this.state.editmaxdate,
			  }
			  console.log(payload);
			  axios.post('/api/dates/'+this.state.userid +'/items/'+i, payload)
			   .then(function (response) {
			   console.log(response);
			   var ss = self;
			   if(response.data.code == 200){
				 console.log("note create successfull");
				 //console.log(response.data.user);
				 //var uploadScreen=[];
				 //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
				 self.setState({newtitle:""});
				 self.setState({newcontent:""});
				 alert("Congradulations!Update Appointdate Successfully!");
				 axios.get('api/users/'+self.state.userid)
				   .then(function (response) {
				   console.log(response);
				   if(response.data.code == 200){
					 console.log("date update successfull");
					 console.log(response.data.user);
					 //var uploadScreen=[];
					 //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
					 //ss.setState({newtitle:""});
					 self.setState({user:response.data.user});
					 self.setState({dataItems:response.data.user.dateItems});
					 //self.renderNotelist(response.data.user.dateItems);
					 self.renderNotelist(response.data.user.dateItems);
				   }
				   else if(response.data.code == 404){
					 console.log("Date update fail");
					 alert(response.data.success)
				   }
				   else{
					 console.log("Date update fail");
					 alert("Date update fail");
				   }
				   })
				   .catch(function (error) {
				   console.log(error);
				   });  
			   }
			   else if(response.data.code == 404){
				 console.log("Date create fail");
				 alert(response.data.success)
			   }
			   else{
				 console.log("Date create fail");
				 alert("Date  create fail");
			   }
			   })
			   .catch(function (error) {
			   console.log(error);
			   });
				  
	  } else{
		  alert("date time is null!");
	  } 
  
	}
  handleChangeTimePicker24min = (event, date) => {
    this.setState({value24min: date});
  };
  handleChangeTimePicker24max = (event, date) => {
    this.setState({value24max: date});
  };
  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
  };
  /* create Time */
  handleNoteCreateClick(event){
   var self = this;
    var localloginComponent = [];
    if(1){
     localloginComponent.push(
          <MuiThemeProvider>
            <div>
			  <div>
				<DatePicker
					onChange={this.handleChangeMinDate}
					autoOk={this.state.autoOk}
					floatingLabelText="Min Date time"
					defaultDate={this.state.minDate}
					disableYearSelection={this.state.disableYearSelection}
				  />
		 		<TimePicker
				  format="24hr"
				  hintText="24hr Format"
				  value={this.state.value24min}
				  onChange={this.handleChangeTimePicker24min}
				/>
		        <DatePicker
					onChange={this.handleChangeMaxDate}
					autoOk={this.state.autoOk}
					floatingLabelText="Max Date Time"
					defaultDate={this.state.maxDate}
					disableYearSelection={this.state.disableYearSelection}
				  />
		 		<TimePicker
				  format="24hr"
				  hintText="24hr Format"
				  value={this.state.value24max}
				  onChange={this.handleChangeTimePicker24max}
				/>
			  </div>
              <RaisedButton label="Create" primary={true} style={style} onClick={(event) => this.handleNoteUploadData(event)}/>
			  <RaisedButton label="Cancel" primary={true} style={style} onClick={() => this.renderNotelist(this.state.dateItems)}/>
           </div>
           </MuiThemeProvider>
        )
  }
     this.setState({notePreview:localloginComponent})
}
 /* update note */
 handleNoteUploadData(event){
    var self = this;
	console.log(this.state.value24min);
	console.log(this.state.minDate);
	
	
    if(this.state.value24min != null && this.state.value24max != null  & this.state.minDate != null  && this.state.maxDate != null ) {
      this.state.minDate.setHours(this.state.value24min.getHours(), this.state.value24min.getMinutes(), this.state.value24min.getSeconds(),0);
      this.state.maxDate.setHours(this.state.value24max.getHours(), this.state.value24max.getMinutes(), this.state.value24max.getSeconds(),0);
      var payload={
        "startdate":this.state.minDate,
        "enddate": this.state.maxDate,
      }
      console.log(payload);
      axios.post('/api/dates/'+this.state.userid, payload)
       .then(function (response) {
       console.log(response);
	   var ss = self;
       if(response.data.code == 200){
         console.log("note create successfull");
         //console.log(response.data.user);
         //var uploadScreen=[];
         //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
         self.setState({newtitle:""});
         self.setState({newcontent:""});
         alert("Congradulations!Create Appointdate Successfully!");
		 axios.get('api/users/'+self.state.userid)
		   .then(function (response) {
		   console.log(response);
		   if(response.data.code == 200){
			 console.log("note create successfull");
			 console.log(response.data.user);
			 //var uploadScreen=[];
			 //uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)
			 //ss.setState({newtitle:""});
			 self.setState({user:response.data.user});
			 self.setState({dataItems:response.data.user.dateItems});
			 //self.renderNotelist(response.data.user.dateItems);
			 self.renderNotelist(response.data.user.dateItems);
		   }
		   else if(response.data.code == 404){
			 console.log("Date create fail");
			 alert(response.data.success)
		   }
		   else{
			 console.log("Date create fail");
			 alert("Date create fail");
		   }
		   })
		   .catch(function (error) {
		   console.log(error);
		   });  
       }
       else if(response.data.code == 404){
         console.log("Date create fail");
         alert(response.data.success)
       }
       else{
         console.log("Date create fail");
         alert("Date  create fail");
       }
       })
       .catch(function (error) {
       console.log(error);
       });
	   } else{
		   
		   alert("Date time is null");
	   } 
  }
/*
  Function:toggleDrawer
  Parameters: event
  Usage:This fxn is used to toggle drawer state
  */
toggleDrawer(event){
  // console.log("drawer click");
  this.setState({draweropen: !this.state.draweropen})
}

/*
  Function:handleLogout
  Parameters: event
  Usage:This fxn is used to end user session and redirect the user back to login page
  */
handleLogout(event){
  // console.log("logout event fired",this.props);
  var loginPage =[];
  loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
  this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
}
  render() {
    //console.log(this.props.user.dateItems);
    //this.generateRows();
    /*
    let rowComponents = this.generateRows(this.props.user.dateItems);
      let table_rows = []
      let table_headers = [];
      let data = this.props.users.dateItems;
    if (this.props.user.dateItems.length >0){
      let headers = Object.keys(this.props.user.dateItems[0]);
        headers.forEach(header => table_headers.push(<TableCell key={header}>{header}</TableCell>));
    }*/
    return (
      <div className="App">
         
          <div className="container">
               
              {this.state.notePreview}
          </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};
const style1 = {
  margin: 0,
};
export default DateScreen;