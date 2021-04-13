import React, {useState, useContext, useEffect} from "react";
import AuthContext from '../auth/AuthContext'
const SignIn = props => {
    const authContext = useContext(AuthContext);
    const {loginuser,isAuthenticated }=authContext

    useEffect(() =>{
        if(isAuthenticated){
            props.history.push("/curriculum")

        }
    }, [isAuthenticated, props.history])


    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const {email, password} = user;
    const onSubmit = e => {
        e.preventDefault()
        loginuser({
            email,
            password
        })
    }
    const onChange= e => setUser({
        ...user, [e.target.name]: e.target.value
    })
    return (
        <form onSubmit ={onSubmit}>
                    <h3 style = {{textAlign: 'center'}}>Sign In</h3>
    
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" id="email" className="form-control" required placeholder="Enter email"  name = 'email' value = {email} onChange = {onChange}/>
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" id="password" className="form-control" required placeholder="Enter password" name = 'password' value = {password} onChange = {onChange} />
                    </div>
    
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
    
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
      );
    }



export default SignIn;