import React from "react";
import axios from 'axios';
import "./auth.css";

class Login extends React.Component{


    constructor(props) {
        super(props)
        this.state = { username: '',
                       password: ''} 

        //bind 'this'
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.navigate = this.navigate.bind(this);
      }


    handleChange(event) {
        const target = event.target;
        const name = event.target.name;
        const value = target.value;

        this.setState ({
            [name]: value
        });
    }


    navigate(access){
        console.log(access);
        if(access === "blog editor"){
            window.location = "/blog/allposts";
        }else if (access === "volunteer"){
            window.location = "/chat/observe";
        }else if (access === "admin"){
            window.location = "/admin/overview";
        }
    }

    handleClick(event){
        console.log('Username');
        console.log(this.state.username);
        console.log('Password');
        console.log(this.state.password);

        // Made an object so it can be passed into axios
        const credentials = {
            email: this.state.username,
            password: this.state.password,
        }

        //POST METHOD
        axios.post("https://runaway-practicum.herokuapp.com/api/volunteer/login", credentials)
        .then(res => {
            console.log(res.data);
            if(res.data.auth){
                localStorage.setItem("JWT",res.data.token);
                localStorage.setItem("EMAIL",res.data.user.email);
                localStorage.setItem("ACCESS",res.data.user.access);
            }
            
            this.navigate(res.data.access)
        });
        
    }

    render(){
        return(
            <div className = "authContainer">

                <img id = "logo" src = "/asset/logo.svg"/>
                <img src = "/asset/runaway.svg"/>
                <img style = {{marginBottom:"45px"}}src = "/asset/employee.svg"/>
                <input
                    type='text'
                    name='username'
                    value={this.state.title}
                    placeholder= "username"
                    onChange={this.handleChange}
                />

                <input
                    type='text'
                    name='password'
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="password"
                />
                
                <br></br>
                <br></br>

                <div onClick = {this.handleClick}>SUBMIT</div>
              </div>
          )
      }
 }

 export default Login;
