import React, {useContext, useState, useEffect} from "react";
import AuthContext from '../auth/AuthContext'
const Register = props => {
    const authContext = useContext(AuthContext);
    const {registeruser,isAuthenticated }=authContext

    useEffect(() =>{
        if(isAuthenticated){
            props.history.push("/curriculum")

        }
    }, [isAuthenticated, props.history])
    const [user, setUser] = useState({
        name:'',
        email: '',
        password: ''
    })
    const {name, email, password} = user;
    const onChange = e => setUser({
        ...user, [e.target.name]: e.target.value
    })
    const onSubmit = e => {
        e.preventDefault()
        registeruser({
            name,
            email,
            password
        })
    }
    return (
        <form onSubmit ={onSubmit}>
                    <h3 style = {{textAlign: 'center'}}>Register</h3>
    
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" required name = 'name' value = {name} onChange = {onChange}/>
                    </div>
    
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>
    
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" required name = 'email' value = {email} onChange = {onChange}/>
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" required name = 'password' value = {password} onChange = {onChange}/>
                    </div>
    
                    <button type="submit" className="btn btn-primary btn-block" value='Register Now'>Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="#">sign in?</a>
                    </p>
                </form>
      );
}


export default Register;