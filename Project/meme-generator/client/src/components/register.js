import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import {isEmail} from '../helpers/email';
import { ToastContainer, toast } from 'react-toastify'; 
import  axiosInstance  from '../helpers/AxiosHelper';
import 'react-toastify/dist/ReactToastify.css';

 class RegisterForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			message: null, 
			user: {
				name: "",
				email: "",
				password: "",
				confirmPassword: ""
			}
		}
		this._onSubmit = this._onSubmit.bind(this);
		this._onTextFieldChange = this._onTextFieldChange.bind(this);
        this._validateFields = this._validateFields.bind(this);
	}

	_validateFields() {
        
		if(this.state.user.name === '' || this.state.user.name === undefined) {
            toast.warn('Name is Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.user.email === '' || this.state.user.email === undefined) {
            toast.warn('Email is Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if( !isEmail(this.state.user.email)) {
            toast.warn('Enter valid email address', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.user.password === '' || this.state.user.password === undefined || this.state.user.password.length < 3) {
            toast.warn('Password is Required and should be more than 3 character long.', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.user.confirmPassword === '' || this.state.user.confirmPassword === undefined || this.state.user.confirmPassword.length < 3) {
            toast.warn('Confirm Password is required and should be more than 3 character long.', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.user.password !== this.state.user.confirmPassword){
            toast.warn(' Password and Confirm Password should match.', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        return true;
    }
 
	async _onSubmit(event){ 
		event.preventDefault();
		if(!this._validateFields()) return;

        let response = await axiosInstance.post('/register', this.state.user);
        if(response !== undefined) {
            if(response.data.isSuccess){
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                let redirect = this.props.history;
                    setTimeout(function() {
                        redirect.push(`/login`);
                    }, 2100);
            }
            this.setState({
                message:{ 
                    message: response.data.message
                }
            });
        } 
	}

	_onTextFieldChange(e){ 
		let {user} = this.state;
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		user[fieldName] = fieldValue;
		this.setState({user: user});
    }
    
    handleClick =() => {
        this.props.history.push('/login');
    }
	render(){
		const {user, message} = this.state; 
		return (
				<div className="container"> 
                    <ToastContainer autoClose={4000} /> 
                    <h2 className="form-title">Sign Up</h2>
                    <form onSubmit={this._onSubmit}>
                        {
                            message ? <div className="app-message">
                                <p className={message.type}>{message.message}</p>
                            </div>: null
                        } 	
                        <div>									
                            <div className='form-group row'>
                                <label className="col-sm-2 col-form-label" htmlFor="name-id">Name</label>
                                <div className="col-sm-10">
                                    <input value={user.name} onChange={this._onTextFieldChange} placeholder="Your name" id="name-id" type="text" name="name" />
                                </div>
                            </div>
                        </div>  
                        <div className='form-group row'>
                            <label className="col-sm-2 col-form-label" htmlFor="email-id">Email</label>
                            <div className="col-sm-10">
                                <input value={user.email} onChange={this._onTextFieldChange} placeholder="Your email address" id="email-id" type="email" name="email" />
                            </div>
                        </div> 
                        <div className='form-group row'>
                            <label className="col-sm-2 col-form-label" htmlFor="password-id">Password</label>
                            <div className="col-sm-10">
                                <input value={user.password} onChange={this._onTextFieldChange} placeholder="Your password" id="password-id" type="password" name="password" />
                            </div> 
                        </div>
                        <div>
                            <div className='form-group row'>
                                <label className="col-sm-2 col-form-label" htmlFor="confirm-password-id">Confirm Password</label>
                                <div className="col-sm-10">
                                    <input value={user.confirmPassword} onChange={this._onTextFieldChange} placeholder="Confirm password" id="confirm-password-id" type="password" name="confirmPassword" />
                                </div>
                            </div>
                        </div> 
                        <div className="col-sm-10">
                            <button className="btn btn-success btn-md">Sign Up</button>
                        </div>
                        <div className="col-sm-10">
                            <div>Don't have an account ? <button type="button" onClick={this.handleClick} className="btn btn-primary btn-sm">Sign In</button></div>											
                        </div> 
                    </form> 
				</div>
			)
	}

}

export default withRouter(RegisterForm)