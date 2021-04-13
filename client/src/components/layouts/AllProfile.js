import React, {Fragment, useContext,useEffect} from 'react'
import ProfileContext from './Profile/ProfileContext'
import ProfileItem from './ProfileItem'

const AllProfile = ()=>{
    const profileContext = useContext(ProfileContext)
    const {profile, getProfile,loading} = profileContext
    useEffect(()=>{
        getProfile()
    }, [])
    return(
        <Fragment>
            {profile.map(profile => (
                <ProfileItem key = {profile.id} profile = {profile}/>
            ))}
        </Fragment>
    )
}
export default AllProfile