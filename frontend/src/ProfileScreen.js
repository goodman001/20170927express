import React, { Component } from 'react';
import './App.css';
/*
Screen:LoginScreen
Loginscreen is the main screen which the user is shown on first visit to page and after
hitting logout
*/
import LoginScreen from './Loginscreen';
import UploadScreen from './UploadScreen';
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

var apiBaseUrl = "http://192.168.44.130:8000/api/";
/*
Module:Dropzone
Dropzone is used for local file selection
*/
import Dropzone from 'react-dropzone';
/*
Module:superagent
superagent is used to handle post/get requests to server
*/
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import axios from 'axios';
var request = require('superagent');

class ProfileScreen extends Component {
  constructor(props){
    super(props);
	  console.log(props);
    
    this.state={
      user:this.props.user,
      userid:this.props.user.id,
	  username:this.props.user.username,
	  email: this.props.user.email,
      password: this.props.user.password,
      gender: this.props.user.gender,
      location: this.props.user.location,
      category: this.props.user.category,
      price: this.props.user.price,
      description: this.props.user.description,
    }
  }
  componentDidMount(){
    
  }
  componentWillMount(){
  }
  /*
  Function:handleCloseClick
  Parameters: event,index
  Usage:This fxn is used to remove file from filesPreview div
  if user clicks close icon adjacent to selected file
  */ 
  /*
  Function:onDrop
  Parameters: acceptedFiles, rejectedFiles
  Usage:This fxn is default event handler of react drop-Dropzone
  which is modified to update filesPreview div
  */
  /*generateRows(noteItems) {
        console.log(noteItems);
        //threadshow=[<TableCell>ID<TableCell>,<TableCell>Title<TableCell>,<TableCell>Content<TableCell>];
        //this.setState({notethreadPreview,threadshow});
        var notePreview=[];
        for(var i in noteItems){
          notePreview.push(<TableRow>
            <TableCell>
            {noteItems[i].id}
            </TableCell>
            <TableCell>
            {noteItems[i].title}
            </TableCell>
            <TableCell>
            {noteItems[i].content}
            </TableCell>
            </TableRow>
          )
        }
        this.setState({notePreview});
        
    }*/
/*
  Function:handleClick
  Parameters: event
  Usage:This fxn is handler of submit button which is responsibel fo rhandling file uploads
  to backend
*/




handleClick(event){
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if( this.state.email.length>0 && this.state.gender.length>0 && this.state.location.length>0 && this.state.category.length>0 && this.state.price.length>0 && this.state.description.length>0){
      var payload={
      "email":this.state.email,
      "gender":this.state.gender,
      "location":this.state.location,
	  "category": this.state.category,
      "price":this.state.price,
      "description":this.state.description
      }
      axios.post('/api/users/'+this.state.userid, payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
        //  console.log("registration successfull");
		   alert("Edit profile successfully!");
		   
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
handleClickPwd(event){
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if( this.state.password.length>0 ){
      var payload={
      "password":this.state.password
      }
      axios.post('/api/users/'+this.state.userid, payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code == 200){
        //  console.log("registration successfull");
		   alert("Edit password successfully!");
		   
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
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
    //console.log(this.props.user.noteItems);
    //this.generateRows();
    /*
    let rowComponents = this.generateRows(this.props.user.noteItems);
      let table_rows = []
      let table_headers = [];
      let data = this.props.users.noteItems;
    if (this.props.user.noteItems.length >0){
      let headers = Object.keys(this.props.user.noteItems[0]);
        headers.forEach(header => table_headers.push(<TableCell key={header}>{header}</TableCell>));
    }*/
    return (
      <div className="App">
         
          <div className="container">
			   <p>Welcome {this.state.user.username}</p>
			   <center><h3>Edit profile</h3></center>
			   <MuiThemeProvider>
				  <div>          
				   <TextField
					 hintText={"Enter your Email"}
					 floatingLabelText={"Email"}
					 value={this.state.email}
					 floatingLabelText="Email"
					 onChange = {(event,newValue) => this.setState({email:newValue})}
					 />
				   <br/>
				   <TextField
					 hintText="Enter your gender"
					 floatingLabelText={"Gender"}
					 value={this.state.gender}
					 floatingLabelText="gender"
					 onChange = {(event,newValue) => this.setState({gender:newValue})}
					 />
				   <br/>
				   <TextField
					 hintText="Enter your location"
					 floatingLabelText={"Location"}
					 value={this.state.location}
					 floatingLabelText="location"
					 onChange = {(event,newValue) => this.setState({location:newValue})}
					 />
				   <br/>
				   <TextField
					 hintText="Enter your category"
					 floatingLabelText={"category"}
					 value={this.state.category}
					 floatingLabelText="category"
					 onChange = {(event,newValue) => this.setState({category:newValue})}
					 />
				   <br/>
				   <TextField
					 hintText="Enter your price"
					 floatingLabelText={"price"}
					 value={this.state.price}
					 floatingLabelText="price"
					 onChange = {(event,newValue) => this.setState({price:newValue})}
					 />
				   <br/>
				   <TextField
					 hintText="Enter your description"
					 floatingLabelText={"description"}
					 value={this.state.description}
					 floatingLabelText="description"
					 onChange = {(event,newValue) => this.setState({description:newValue})}
					 />
				   <br/>
				   <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
				  </div>
			 </MuiThemeProvider>
		     <center><h3>Edit Password</h3></center>
			   <MuiThemeProvider>
				  <div>          
				   <TextField
					 hintText={"Enter your Password"}
					 floatingLabelText={"password"}
					 floatingLabelText="password"
					 type="password"
					 onChange = {(event,newValue) => this.setState({password:newValue})}
					 />
				   <br/>
				   <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClickPwd(event)}/>
				  </div>
			 </MuiThemeProvider>
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
export default ProfileScreen;