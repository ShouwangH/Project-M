import React, {useState, useEffect, useContext} from 'react';
import { getFirestore, query, collection, onSnapshot, doc } from 'firebase/firestore';
import { SelectedProjectContext, SelectedTaskContext } from '../context';


export default function Projects() {
  const [active, setActive] = useState()
  const [projects, setProjects] = useState([])
  const {setSelectedProject} = useContext(SelectedProjectContext)
  const {setSelectedTask} = useContext(SelectedTaskContext)


  useEffect( async () => {
    getProjects()
  }, [])


  const getProjects = async () => {
    const db = getFirestore()
    const q = query(collection(db, 'projects'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allProjects = [];
      querySnapshot.forEach((doc) => {
        allProjects.push(doc.data());
      });
    
      

    if (unsubscribe) {
      setProjects(allProjects)
    }});
  }

  const projectItems = (arr) => {
    return arr.map(project => <div className="project-sidebar" key={project.projectid} onClick={()=>{
      setActive(project.projectid)
      setSelectedProject(project)
      setSelectedTask("")
      }}>
      <p>{project.name}</p>
      </div>)
  }
  
    return (<div>
      {projectItems(projects)}
      </div>)
  
  }
