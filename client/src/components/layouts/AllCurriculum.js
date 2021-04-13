import React, {Fragment, useContext,useEffect} from 'react'
import CurriculumItem from './CurriculumItem'
import CurriculumContext from './Curriculum/CurriculumContext'
const AllCurriculum = ()=>{
    /**const curriculumContext = useContext(CurriculumContext)
    const {curriculum, getCurriculum,loading} = curriculumContext
    useEffect(()=>{
        getCurriculum()
    }, [])
    return(
        <Fragment>
            {curriculum.map(curriculum => (
                <CurriculumItem key = {curriculum.id} profile = {curriculum}/>
            ))}
        </Fragment>
    )**/
    return(
        <div></div>
    )
}
export default AllCurriculum