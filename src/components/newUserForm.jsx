import React from 'react';
import Form from "./common/form";
import Joi from "joi-browser";
import { createUser } from '../services/userService';

class NewUser extends Form {
  state = {  
    data: { name:"", email:"", password:""},
    errors: {}
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password")
  };

  doSubmit= async() =>{
    try{
      const { data } = this.state;
      await createUser(data.name, data.email, data.password);
      
      window.location = "/subscriptions";
    } catch(ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  
  render() { 
    return ( 
       <div>
         <h3>New User Creation</h3>
         <form onSubmit={this.handleSubmit}>
           {this.renderInput("name", "Name")}
           {this.renderInput("email", "Email")}
           {this.renderInput("password", "Password")}
           {this.renderButton("Add")}
         </form>
       </div>
     );
  }
}
 
export default NewUser;