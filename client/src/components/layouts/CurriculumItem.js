import React, {useContext} from 'react'
import CurriculumContext from './Curriculum/CurriculumContext'

const CurriculumItem = ({ curriculum })=> {
  const curriculumContext = useContext(CurriculumContext)
  const {deleteProfile, clearCurrent, updateProfile, setCurrent} = curriculumContext
  const{_id, title,curr,professor} = curriculum
  
    return (
      <div className="user-profile">
        <div class="container">
          <p>Title : {curriculum.title}</p>
          <p>Curriculum : {curriculum.cur}</p>
          <p>Professor : {curriculum.professor}</p>
        </div>
      </div>
    )
    
}
export default CurriculumItem