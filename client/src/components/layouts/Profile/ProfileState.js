import React, { useReducer } from "react";
import uuid from "react-uuid"
import ProfileContext from './ProfileContext'
import ProfileReducer from './ProfileReducer'
import axios from 'axios'
import {
    ADD_PROFILE,
    SAVE_PROFILE,
    DELETE_PROFILE,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    SET_CURRENT_PROFILE,
} from './actions'

const ProfileState = props => {
    const initialState = {
        profile : [
            
            
            
        ],
        current: null,
        filtered: null
    }
    const [state,dispatch] = useReducer(ProfileReducer, initialState)
    /**Add all actions here */

    /**get all profile */
    const getProfile = async () => {
        try {
           const res = await axios.get('/api/profile')
           dispatch({type: SAVE_PROFILE, payload:res.data}) 
        } catch (err) {
            
        }
    }
    /**Add Employee */

    const AddProfile = async profile => {
        const config = {
            headers: {
                'Content-Type': 'application/json'

            }
        }
        try {
            const res = await axios.post('/api/profile', profile, config)
            dispatch({
                type: ADD_PROFILE, payload: profile
            })
        } catch (err) {
            console.log(err)
        }
        
    }

    /**Delete Employee */
    const deleteProfile = async id => {
        try {
           await axios.delete(`/api/profile/${id}`) 
           dispatch({
            type: DELETE_PROFILE, payload: id
        })
        } catch (err) {
            console.log(err)
        }
        
    }

    /**Set Current */
    const setCurrent = profile => {
        dispatch({
            type: SET_CURRENT_PROFILE, payload: profile
        })
    }

    /**Update Profile */
    const updateProfile = async profile => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/profile/${profile._id}`,profile, config)
            dispatch({
                type: UPDATE_PROFILE, payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
        
    }

    /**Clear Current */
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_PROFILE
        })
    }
    return (
        <ProfileContext.Provider
            value = {
                {
                    profile: state.profile,
                    current: state.current,
                    AddProfile,
                    deleteProfile,
                    setCurrent,
                    getProfile,
                    clearCurrent,
                    updateProfile
                }
            }>
                {
                    props.children
                }
            </ProfileContext.Provider>
    )
}
export default ProfileState