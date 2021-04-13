import React, {useContext} from 'react'
import ProfileContext from './Profile/ProfileContext'

const ProfileItem = ({ profile })=> {
  const profileContext = useContext(ProfileContext)
  const {deleteProfile, clearCurrent, updateProfile, setCurrent} = profileContext
  const{_id, name, email, phone, bio} = profile
  const onDelete = () => (
    deleteProfile(_id),
    clearCurrent()
  )
    return (
      <div className="user-profile">
        <div class="container">
          <p>Name : {profile.name}</p>
          <p>Email : {profile.email}</p>
          <p>Phone : {profile.phone}</p>
          <p>Bio : {profile.bio}</p>
          <a href="#" onClick = {()=>setCurrent(profile)} className="btn btn-info">Edit</a>
          <a href="#" onClick = {onDelete} className="btn btn-info">Delete</a>
        </div>
      </div>
    )
  /** 
    return(
      <div>
        <div className="card mt-3">
                <h5 className="card-header">{profile.name}</h5>
                <div className="card-body">
                  <p className="card-text">Email : {profile.email}</p>
                  <p className="card-text">Phone : {profile.phone}</p>
                  <p className="card-text">Bio : {profile.bio}</p>
                  <a href="#" className="btn btn-info">Edit</a>
                  <a href="#" className="btn btn-danger ml-3">Delete</a>
                </div>
          </div>
      </div>
        
    )*/
    
}
export default ProfileItem