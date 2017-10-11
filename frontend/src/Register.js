import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
/*
  Register page
*/
class Register extends Component {
  constructor(props){
    super(props);
	  console.log(this.props.role);
    this.state={
      username:'',
      email:'',
      password:'',
      gender:'',
      location:'',
      category:'',
      price:'',
      description:'',
      role:this.props.role,
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  /* check email */
  isValidEmailAddress(emailAddress) {
     var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
     return pattern.test(emailAddress);
  };
  /* check num */
  checkNum(input) {
    var m = (/[\d]+(\.[\d]+)?/).exec(input);
    return m;
  }
  /* register btn click function */
  handleClick(event,role){
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
	if(this.state.username.length==0 || this.state.email.length==0 ||  this.state.password.length==0 ||  this.state.gender.length==0 ||  this.state.location.length==0 || this.state.category.length==0 || this.state.price.length==0 ||  this.state.description.length==0){
		alert("Input Value must not be empty!");
	}
	else if(this.state.gender != 'M' && this.state.gender!= 'F'){
		alert("Gender must be M or F");
	}else if( !this.isValidEmailAddress(this.state.email)){
		alert("Email format is wrong!");
	}else if(!this.checkNum( this.state.price )){
		alert("Price must be number!");
	}
    else{
      var payload={
		  "username": this.state.username,
		  "email":this.state.email,
		  "password":this.state.password,
		  "gender":this.state.gender,
		  "location":this.state.location,
		  "category": this.state.category,
		  "price":this.state.price,
		  "description":this.state.description,
          "role":this.state.role,
	  }
	  axios.post('/api/users', payload)
	  .then(function (response) {
	  console.log(response);
	  if(response.data.code == 200){
	  //  console.log("registration successfull");
	     var loginscreen=[];
	     loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
	     var loginmessage = "Not Registered yet.Go to registration";
	     self.props.parentContext.setState({loginscreen:loginscreen,
		   loginmessage:loginmessage,
		   buttonLabel:"Register",
		   isLogin:true
	     });
	     alert("Resgister successfully!");
	  }
	  else{
	   console.log("some error ocurred",response.data.code);
	  }
      })
      .catch(function (error) {
         console.log(error);
      });
    }

  }
  handleMenuChange(value){
    console.log("menuvalue",value); 
    this.setState({role:value});
    //this.setState({menuValue:value,                   loginComponent:localloginComponent,                   loginRole:loginRole})
  }
  render() {
    // console.log("props",this.props);
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>           
           <TextField
             hintText={"Enter your Email"}
             floatingLabelText={"Email"}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
		   <TextField
             hintText="Enter your gender(M or F)"
             floatingLabelText="gender"
             onChange = {(event,newValue) => this.setState({gender:newValue})}
             />
           <br/>
		   <TextField
             hintText="Enter your location"
             floatingLabelText="location"
             onChange = {(event,newValue) => this.setState({location:newValue})}
             />
           <br/>
		   <TextField
             hintText="Enter your category"
             floatingLabelText="category"
             onChange = {(event,newValue) => this.setState({category:newValue})}
             />
           <br/>
		   <TextField
             hintText="Enter your price"
             floatingLabelText="price"
             onChange = {(event,newValue) => this.setState({price:newValue})}
             />
           <br/>
		   <TextField
             hintText="Enter your description"
             floatingLabelText="description"
             onChange = {(event,newValue) => this.setState({description:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;