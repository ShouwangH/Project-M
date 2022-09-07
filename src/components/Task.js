import React, { useEffect, useState} from 'react';
import { updateDoc, doc, getFirestore, getDoc } from 'firebase/firestore';
import AssignTask from './AssignTask';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

export default function Task(props) {
  const [proper, setProper] = useState()
  const [completed, setCompleted] = useState(props.task.completed)
  const [name, setName] = useState(props.task.name)

 


  const getUserData = async (ref) => {
    const db = getFirestore()
    const snap = await getDoc(ref)
    if (snap.exists()) {
      let name = ""
      name = snap.data().firstName.concat(" ",snap.data().lastName)
      setProper(name)

    }
  }

  
  const toggleCompleteTask = async () => {
    setCompleted(!completed)
    const db = getFirestore()
    const docref = doc(db,"tasks", props.task.id)
    await updateDoc(docref, {
      completed:!completed
    })

  }  

  const submit = e => {
    e.preventDefault()
    editTask(name)
  }

  const editTask = async (name) => {
    const db = getFirestore()
    const docref = doc(db,"tasks", props.task.id)
    await updateDoc(docref, {
      name:name
    })

  }  

  const removeTask = () => {}

  if (props.task.assignedto) {
    const db = getFirestore()
    const userref = doc(db, "users", props.task.assignedto)
    getUserData(userref)
  }

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  
    return (
      <ListItem
        key={props.index}
        secondaryAction={
          <Checkbox
            edge="end"
            onChange={handleToggle(props.index)}
            checked={checked.indexOf(props.index) !== -1}
          />
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemAvatar>
          </ListItemAvatar>
          <ListItemText /*id={}*/ primary={props.task.name} />
        </ListItemButton>
      </ListItem>
    );
  };