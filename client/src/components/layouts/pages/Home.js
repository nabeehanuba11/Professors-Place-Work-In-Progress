import React, {useState,useContext, useEffect} from "react"
import AllCurriculum from '../AllCurriculum'
import AuthContext from '../auth/AuthContext'
import style from 'styled-components'
import spinner from './spinner.gif'
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'

//props,({posts})

const Home = ({posts})  => {
  
  const [curr,setCurriculum] = useState([])
  //Delete curriculum by id
  const deleteCurriculum = id =>{
    axios.delete(`/api/curriculum/${id}`)
    .then(res=>alert(res.data))
    .catch(err=>console.log(err))
    setCurriculum(curr.filter(elem=>elem._id!==id))
  }
  const styling ={
    width: '40rem',
    margin: '20px 20px 20px 20px',
    padding: '20px',
  }
  const row={
    width: '',
    padding: '',
  }
  /** 
    const authContext = useContext(AuthContext)
  const {isAuthenticated, loadUser} = authContext
  useEffect(()=>{
    if(isAuthenticated){
      loadUser();
    }
    else{
      props.history.push('/login')
    }
  }, [isAuthenticated, props.history])**/
    return(
      <MainContainer>
        <div class="row" style={row}>
        {!posts.length ? (<img src={spinner} alt="loading"/>):(
          
        posts.map((curriculum,key)=>(
            
            <div class="col-sm-6" key={key}>
            <div class="card"  style={styling}>
            <img class="card-img-top" src={`/uploads/${curriculum.image}`} alt="Card image cap" style={{width:'35rem', height:'25rem'}}/>
              <div class="card-body">
                <Link to={{
                          pathname:`/api/curriculum/${curriculum._id}`
                        }}><h2 class="card-title">{curriculum.title}</h2></Link>
                <h5 class="card-subtitle mb-2 text-muted">{curriculum.professor}</h5>
                <p class="card-text">{curriculum.curr}</p>
                <div class="btn-toolbar">
                <Link to={{pathname:`/api/curriculum/update/${curriculum._id}`}} class="btn btn-primary">Edit Curriculum</Link>
                <button onClick={()=>deleteCurriculum(curriculum._id)} class="btn btn-primary">Delete Curriculum</button>
                </div>
              </div>
            </div>
            </div>
            
          
          
        )))}/</div>
        
        </MainContainer>
    )
    }

  export default Home
/**<div className="card" style="width: 18rem; key={key}">
  <div className="card-body">
    <Link to={{
              pathname:`/api/curriculum/${curriculum._id}`
            }}><h5 class="card-title">{curriculum.title}</h5></Link>
    <h6 className="card-subtitle mb-2 text-muted">{curriculum.professor}</h6>
    <p className="card-text">{curriculum.curr}</p>
    <Link to={{pathname:`/api/curriculum/update/${curriculum._id}`}} className="btn btn-primary">Edit Curriculum</Link>
    <button onClick={()=>deleteCurriculum(curriculum._id)} className="btn btn-primary">Delete Curriculum</button>
  </div>
</div> */

/**
<div class="container">
        <div class="row">
            <div class="col-lg-6 mb-4">
                <div class="card">
                    <img class="card-img-top" src="" alt="">
  
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                            Some quick example text to build on 
                            the card title and make up the bulk 
                            of the card's content.
                        </p>
  
                        <a href="#" class="btn btn-outline-primary btn-sm">
                            Card link
                        </a>
                        <a href="#" class="btn btn-outline-secondary btn-sm">
                            <i class="far fa-heart"></i></a>
                    </div>
                </div>
            </div>
 */

/**<div className="container" key={key}>
            <Link to={{
              pathname:`/api/curriculum/${curriculum._id}`
            }}><h2>{curriculum.title}</h2></Link>
            <p>{curriculum.curr}</p>
            <span className="badge badge-secondary p-2">{curriculum.professor}</span>
            <div className="row my-5">
              <div className="col-sm-2"><Link to={{pathname:`/api/curriculum/update/${curriculum._id}`}} className= "btn btn-outline-success">Edit Curriculum</Link></div>
              <div className="col-sm-2"><button onClick={()=>deleteCurriculum(curriculum._id)} className= "btn btn-outline-danger">Delete Curriculum</button></div>
            </div>
          </div> */
//Main Container
const MainContainer = style.div`
margin: 7rem 0;

img{
  width: 5rem;
  display:block;
  margin: 0 auto;
}
`
