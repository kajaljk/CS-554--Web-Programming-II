import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'; 
import {isEmail} from '../helpers/email';
import { ToastContainer, toast } from 'react-toastify'; 
import  axiosInstance  from '../helpers/AxiosHelper';
import 'react-toastify/dist/ReactToastify.css';

export default class LoginForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			message: null, 
			redirect: false,
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
        return true;
    }
 
	async _onSubmit(event){  
		event.preventDefault();
		if(!this._validateFields()) return; 
		let payload = {
			email: this.state.user.email,
			password: this.state.user.password
		}
		
		let response = await axiosInstance.post('/login', payload);
		if(response !== undefined) {
			if(response.data.token){
				this.props.history.push('/');
			}
			console.log(response.data.message);
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

	setRedirect = () => {
		this.setState({
		  redirect: true
		})
	}
	renderRedirect = () => {
	if (this.state.redirect) {
		return <Redirect to='/register' />
	}
	}
	render(){
		const { user,message} = this.state; 
		return (
			<div className="container-fluid">
				<ToastContainer autoClose={4000} /> 
				<div className='col-sm-10'>
					<h1>Login</h1>
				</div>
					<form onSubmit={this._onSubmit}>
						{
							message ? <div className="app-message">
								<p className={message.type}>{message.message}</p>
							</div>: null
						}
							
						<div className='form-group'>
							<label className="col-sm-2 col-form-label" htmlFor="email-id">Email</label>
							<div className='col-sm-10'>
								<input value={user.email} onChange={this._onTextFieldChange} placeholder="Your email address" id="email-id" type="email" name="email" />
							</div>
						</div>
						<div className='form-group'>
							<label className='col-sm-2 col-form-label' htmlFor="password-id">Password</label>
							<div className='col-sm-10'>
								<input value={user.password} onChange={this._onTextFieldChange} placeholder="Your password" id="password-id" type="password" name="password" />
							</div>
						</div>
						<div className='col-sm-10'>
							<button className="btn btn-success btn-md center-block">Sign In</button>
						</div>
						<div className='col-sm-10'>
							<div>Don't have an account ?  
								{this.renderRedirect()}
							<button type="button" onClick={this.setRedirect}  className="btn btn-primary btn-sm center-block"> Sign Up</button>
							</div>	
						</div>   
					</form>
				</div>
			)
	}

}
 