import React, {useContext, useState, useEffect} from 'react'
import ProfileContext from './Profile/ProfileContext'

const ProfileForm = () => {
    const profileContext = useContext(ProfileContext)
    const {AddProfile, current, clearCurrent, updateProfile} = profileContext
    useEffect(()=>{
        if(current!== null){
            setprofile(current)
        
        }
        else{
            setprofile({
                name:'',
                email: '',
                phone: '',
                bio: ''
            })
        }
    },[profileContext,current])
    const [profile, setprofile] = useState({
        name:'',
        email: '',
        phone: '',
        bio: ''
    })
    const {name,email,phone, bio} = profile
    const onChange = e => setprofile({
        ...profile,[e.target.name]:e.target.value
    })
    const onSubmit = e =>{
        e.preventDefault();
        if(current===null){
            AddProfile(profile)
        }
        else{
            updateProfile(profile)
            
        }
        
        
    }
    const ClearAll = () =>{
        clearCurrent()
    }
    return(
        <div>
            <h3 className = "alert alert-info">Edit Profile Information</h3>
            <form onSubmit = {onSubmit}>
            <div className="form-group"><input type="name" className="form-control" placeholder="Name" required name = 'name' value = {name} onChange = {onChange} /></div>
            <div className="form-group"><input type="email" className="form-control" placeholder="Email" required name = 'email' value = {email} onChange = {onChange} /></div>
            <div className="form-group"><input type="text" className="form-control" placeholder="Phone" required name = 'phone' value = {phone} onChange = {onChange} /></div>
            <div className="form-group"><input type="text" className="form-control" placeholder="Bio" required name = 'bio' value = {bio} onChange = {onChange} /></div>
            <input type="submit" value = "Save Now" className="btn btn-success"/>
            {current&& (
                <input type="button" value = "Clear Now" onClick = {ClearAll} className="btn btn-warning ml-5"/>
            )}
            </form>

        </div>
    )
}

export default ProfileForm