import React, {useContext, useEffect} from "react";
import ProfileForm from '../ProfileForm'
import AllProfile from "../AllProfile"
import AuthContext from '../auth/AuthContext'
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
    <div className="container">
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
  );
}

export default Profile;