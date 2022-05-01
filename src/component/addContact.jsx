import React, { Component } from 'react'
import { Consumer } from './Context'
import Contacts from './Contacts';
import TextInputGroup from '../helpers/textInputGroup';
import axios from 'axios'

 class AddContact extends Component {
   
     state = {
         name : '',
         email: '',
         phone : '',
         errors : {}
     }
     onInputChange=(e)=>{
         this.setState({
             [e.target.name]:e.target.value
         })
     }
     saveContact = (dispatch,size,e) => {
      //   e.preventDefault()
         e.preventDefault();
         const {name ,email, phone}= this.state;
         if (name==""){
            this.setState(
                {
                    errors: { name: "the name is required ! "}
                }
            )
             return;
         }
         if (email==""){
            this.setState(
                {
                    errors: { email: "the email is required ! "}
                }
            )
            return;
        }
        if (phone==""){
            this.setState(
                {
                    errors: { phone: "the phone is required ! "}
                }
            )
            return;
        }

        const newContact ={
            name : name,
            email:  email,
            phone :  phone
           }
           axios.post("https://jsonplaceholder.typicode.com/users",newContact)
        .then(res => {
            console.log(res.data)
            
            dispatch ({
                type: 'ADD_CONTACT',
                payload:res.data
            })
        })
        .catch(err => console.log("cannot add contact "))
     
       this.setState({
        name : '',
        email: '',
        phone : '',
        errors: {}
       })
       // pour la redirection 
       this.props.history.push('/');

    }
    render() {
        const {name ,email, phone,errors}= this.state;
        return (
            <div>
                <Consumer> 
                      {value => {
                          const {dispatch} =value;
                          return (
                            <div className="container mt-2 mb-2 ">
                            <h3>Add Contact</h3>
                        <form  onSubmit={ this.saveContact.bind(this,dispatch,value.contacts.length)} >
                         <TextInputGroup
                         label="Name"
                         type="text"
                         name="name"
                         value= {name}
                         onChange={this.onInputChange}  
                         error={errors.name}                       
                         />
                       <TextInputGroup
                         label="Email"
                         type="text"
                         name="email"
                         value= {email}
                         onChange={this.onInputChange}    
                         error={errors.email}                     
                         />
                            <TextInputGroup
                         label="Phone"
                         type="text"
                         name="phone"
                         value= {phone}
                         onChange={this.onInputChange}    
                         error={errors.phone}                     
                         />
                   
                        <button type='submit' className="btn btn-block btn-primary">Submit</button>
                        </form>
                        </div>
                          )
                      }
                            
                }
                </Consumer>
            </div>
        )
    }
}
export default  AddContact
