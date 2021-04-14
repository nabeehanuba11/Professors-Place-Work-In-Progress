import React, {useContext, useEffect} from "react";
import ProfileForm from '../ProfileForm'
import AllProfile from "../AllProfile"
import AuthContext from '../auth/AuthContext'
import profilePic from './splash.png'
const Profile = props => {
  const authContext = useContext(AuthContext)
  const {user, isAuthenticated, loadUser} = authContext
  useEffect(()=>{
    if(isAuthenticated){
      loadUser()
    }
    else{
      props.history.push('/login')
    }
  }, [isAuthenticated, props.history])
  return (
    <div className="card border-dark mb-3" style={{width:'60%',margin: '10% auto', display: 'flex'}}>
  <img className="card-img-top" src={profilePic} alt="Card image cap"/>
  <div className="card-body">
    <h2 className="card-title">Name: {user && user.name}</h2>
    <h5 className="card-text">Email: {user && user.email}</h5>
  </div>
  </div>
  );
}

export default Profile;

/**<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">{user && user.name}</h5>
    <p class="card-text">{user && user.email}</p>
  </div>
</div> */

/**
 * <div className="container">
      <div className="row">
        <div className= "col-sm-6">
          <div class="container">
            <h4>{user && user.name}</h4>
            <p>{user && user.email}</p>
          </div>
          <AllProfile />
        </div>
          <div className='col-sm-3'>
            <ProfileForm />
          </div>
      </div>
    </div>
 */