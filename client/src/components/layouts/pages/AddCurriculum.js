import React, {useState,useContext, useEffect} from "react"
import style from 'styled-components'
import axios from 'axios'
import AuthContext from '../auth/AuthContext'
const AddCurriculum = props =>{
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
    const [message,setMessage] = useState('')
    const [fileName,setFileName] = useState('')

    const onChangeFile = e =>{
        setFileName(e.target.files[0])
    }
    const changeOnClick = e => {
        e.preventDefault()
        /**const curriculum = {
            title,
            curr,
            professor
        } */
        const formData = new FormData()
        formData.append("title",title)
        formData.append("curr",curr)
        formData.append("professor",professor)
        formData.append("image",fileName)
        setTitle('')
        setCurriculum('')
        setProfessor('')
        axios.post("/api/curriculum/add", formData)
        .then(res=>setMessage(res.data))
        .catch(err=>console.log(err))
    }

    return(
        <AddCurriculumContainer>
            <form onSubmit={changeOnClick} encType="multipart/form-data">
                <h3>Add New Curriculum</h3>
                <span className="message">{message}</span>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" placeholder="Enter Title of the Course"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="professor">Professor</label>
                    <input type="text" onChange={e=>setProfessor(e.target.value)} value={professor} className="form-control" placeholder="Enter the name of the professor"/>
                </div>
                <div className="form-group">
                    <label htmlFor="curr">Curriculum</label>
                    <textarea className="form-control" value={curr} onChange={e=>setCurriculum(e.target.value)} rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="file">Choose Curriculum Image</label>
                    <input type="file" fileName="image" className="form-control-file" onChange={onChangeFile}></input>

                </div>
                <button type="submit" className="btn btn-primary">Post Curriculum</button>
                </form>
        </AddCurriculumContainer>
    )
}

export default AddCurriculum

const AddCurriculumContainer = style.div`
margin: 3rem auto;
padding: 4rem;
width:50rem;
.btn-primary{
    margin-top: 2rem;
    border:none;
}
.message{
    font-weight:900;
    color: tomato;
    padding: 1rem 1rem 1rem 0;
}
`