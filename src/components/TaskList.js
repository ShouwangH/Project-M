import {query, where, collection, getDocs, addDoc, getFirestore, updateDoc, serverTimestamp, onSnapshot} from 'firebase/firestore'
import {useState, useEffect, useContext, useRef} from 'react';
import Task from './Task';
import Taskform from './Taskform';
import { SelectedProjectContext,SelectedTaskContext } from '../context';
import { List, Box, DrawerHeader, Typography } from '@mui/material';



export default function TaskList(props) {
  const [assignees, setAssignees] = useState([])
  const [tasks, setTasks] = useState([])

  const {selectedProject} = useContext(SelectedProjectContext)
  const {selectedTask, setSelectedTask} = useContext(SelectedTaskContext)

  let titleDisplay = ""

/* useEffect( async () => {   
  gettesttasks()
   getAssignees()
}, [selectedProject, selectedTask, tasks]) */

  const getAssignees = async () => {
    const db = getFirestore()
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q)  
    let queriedUser = [];
      querySnapshot.forEach((doc) => {
        queriedUser.push(doc.data());
      })
      
    setAssignees(queriedUser)

  }
  useEffect( () => gettesttasks(),[] )

  const gettesttasks = () => {
    const testTask= {name: "Test Task",
    completed: false,
    createdby: "testcreator",
    id: "testid",
    projectid: "projecttestid"
  }
    console.log(testTask)
    setTasks([...tasks, testTask])
    console.log("ran setTasks")
    console.log(tasks)
    
  }

  const getTasks = async () => {
    const db = getFirestore()
    const q = query(collection(db, 'tasks'), 
    (selectedTask ? 
      where(selectedTask, "==", props.currentUser.userId) : 
      where('projectid', "==", selectedProject.projectid)))
    const querySnapshot = await getDocs(q)  
    const assignedtasks = []
    querySnapshot.forEach((doc) => {
      assignedtasks.push(doc.data());
    })

    setTasks(assignedtasks)
  }


  const displayTasks = (arr) => {
    return arr.map((task, index) => (<Task task={task} key={index} users={assignees} currentUser={props.currentUser}/>))
  }

  const addTask = async (name) => {
    const db = getFirestore()
    const docref = await addDoc(collection(db,"tasks"), {name:name, createdby:props.currentUser.userId, completed:false, projectid:selectedProject.projectid, timestamp: serverTimestamp()})
    console.log("Document with", docref.id)
    await updateDoc(docref, {
      id:docref.id 

    })
    

  }

  const displayTitle = () => {
    if (selectedTask) {
      switch (selectedTask) {
        case "createdby":
          titleDisplay = "Tasks I've Created"
          break;
        case "assignedby":
          titleDisplay = "Tasks I've Assigned To Others"
          break;
        case "assignedto":
          titleDisplay = "Tasks Assigned To Me"  
          break;
        default:
          titleDisplay = "Testing Purposes"
      }
    }
    else if (selectedProject) {
      titleDisplay = selectedProject.name

    }
    else {
      titleDisplay = "Testing Title Display"
    }
    return titleDisplay
  }


  return (
    <>
    <h3>{displayTitle()}</h3>
    <div className="task-list">
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {displayTasks(tasks)}
            <Taskform addTask={addTask} />
          </List>
    </div>
    </>
  )
}
