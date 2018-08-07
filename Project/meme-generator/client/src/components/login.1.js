import React, {Component} from 'react' 
import classNames from 'classnames'; 
import _ from 'lodash';
import {isEmail} from '../helpers/email';
import { ToastContainer, toast } from 'react-toastify'; 
import  axiosInstance  from '../helpers/AxiosHelper';

export default class LoginForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			message: null,
			isLogin: true,
			user: {
				name: "",
				email: "",
				password: "",
				confirmPassword: ""
			},
			error: {
				name: null,
				email: null,
				password: null,
				confirmPassword: null,
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
		const {isLogin,user} = this.state; 
		event.preventDefault();
		if(!this._validateFields()) return;
		if(isLogin){
			let payload = {
				email: this.state.user.email,
				password: this.state.user.password
			}
			
			let response = await axiosInstance.post('/login', payload);
			if(response !== undefined) {
				console.log(response.data.message);
				this.setState({
					message:{ 
						message: response.data.message
					}
				});
			}
		}
		else{
			let response = await axiosInstance.post('/register', this.state.user);
			if(response !== undefined) {
				console.log(response.data.message);
				this.setState({
					message:{ 
						message: response.data.message
					}
				});
			}
		}
	}

	_onTextFieldChange(e){

		let {user} = this.state;
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
		user[fieldName] = fieldValue;
		this.setState({user: user});
	}
	render(){
		const {isLogin, user, error,message} = this.state;
		const title = isLogin ? 'Sign In' : 'Sign Up'
		return (
				<div className="app-login-form">
					<div className="app-login-form-inner">
							
							<h2 className="form-title">{title}</h2>
							<ToastContainer autoClose={2000} /> 
							<form onSubmit={this._onSubmit}>
								{
									message ? <div className="app-message">
										<p className={message.type}>{message.message}</p>
									</div>: null
								}
								{
									!isLogin ? <div>									
										<div className={classNames('app-form-item', {'error': _.get(error, 'name')})}>
											<label htmlFor="name-id">Name</label>
											<input value={user.name} onChange={this._onTextFieldChange} placeholder="Your name" id="name-id" type="text" name="name" />
										</div>
									</div>: null
								}
								<div className={classNames('app-form-item', {'error': _.get(error, 'email')})}>
									<label htmlFor="email-id">Email</label>
									<input value={user.email} onChange={this._onTextFieldChange} placeholder="Your email address" id="email-id" type="email" name="email" />
								</div>
								<div className={classNames('app-form-item', {'error': _.get(error, 'password')})}>
									<label htmlFor="password-id">Password</label>
									<input value={user.password} onChange={this._onTextFieldChange} placeholder="Your password" id="password-id" type="password" name="password" />
								</div>
								{
									!isLogin ? <div>
										<div className={classNames('app-form-item', {'error': _.get(error, 'confirmPassword')})}>
											<label htmlFor="confirm-password-id">Confirm Password</label>
											<input value={user.confirmPassword} onChange={this._onTextFieldChange} placeholder="Confirm password" id="confirm-password-id" type="password" name="confirmPassword" />
										</div>
									</div>: null
								}
								{
									isLogin ? <div className="app-form-actions">
										<button className="app-button primary">Sign In</button>
										<div className="app-form-description">
											<div>Don't have an account ? <button type="button" onClick={() => {
													this.setState({isLogin: false});
											}} className="app-button app-button-link">Sign Up</button></div>											
										</div>
								</div> : <div className="app-form-actions">
										<button className="app-button primary">Sign Up</button>
										<div className="app-form-description">
											<div>Don't have an account ? <button type="button" onClick={() => {
													this.setState({isLogin: true});
											}} className="app-button app-button-link">Sign In</button></div>											
										</div>
									</div>
								}
							</form>
					</div>
				</div>
			)
	}

}