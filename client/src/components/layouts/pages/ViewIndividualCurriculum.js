import axios from 'axios'
import React, {useState,useContext, useEffect} from "react"
import styled from 'styled-components'
import spinner from './spinner.gif'
import {Link} from 'react-router-dom'
import AuthContext from '../auth/AuthContext'
import Comments from './Comment'
const ViewIndividualCurriculum = props =>{
    const authContext = useContext(AuthContext)
    const {isAuthenticated, loadUser} = authContext
  useEffect(()=>{
    if(isAuthenticated){
      loadUser();
    }
    else{
      props.history.push('/login')
    }
  }, [isAuthenticated, props.history])
    const [title,setTitle] = useState('')
    const [curr,setCurriculum] = useState('')
    const [professor,setProfessor] = useState('')
    const [fileName,setFileName] = useState('')

    useEffect(()=>{
        axios.get(`/api/curriculum/${props.match.params.id}`)
        .then(res=>[
            setTitle(res.data.title),
            setCurriculum(res.data.curr),
            setProfessor(res.data.professor),
            setFileName(res.data.image)
        ])
        .catch(err=>console.log(err))
    }, [])
    return(
        <MainContainer>
            {!title||!curr||!professor ? (<img src={spinner} alt="loading"></img>) :(
                <>
            <img src={`/uploads/${fileName}`} alt="Image" style={{width:'20%', margin: '0 auto', display: 'flex'}}/>
            <h2>{title}</h2>
            <p>{professor}</p>
            <p style={{margin: '0 20%'}}>{curr}</p>
            <Comments />
            <Link to="/curriculum" type="submit" className="btn btn-primary">Back to Curriculum</Link>
            </>)}

        </MainContainer>
        
    )
}

export default ViewIndividualCurriculum

//Main Component
const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-items: center;
align-items: center;

h2{
    text-align: center;
    font-weight: 900;
}
p{
    text-align: center;
}
img{
    width: 1.5rem;
    display: block;
    margin: auto;
}
.btn-primary{
    margin-top: 5rem;
    border:none;
    text-align: center;
}
`;

