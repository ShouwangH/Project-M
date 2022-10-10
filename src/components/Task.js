import React, { useEffect, useState } from 'react';
import { updateDoc, doc, getFirestore, getDoc } from 'firebase/firestore';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';
import moment from 'moment';
import Divider from '@mui/material/Divider';




export default function Task(props) {
  const [proper, setProper] = useState()
  const [completed, setCompleted] = useState(props.task.completed)
  const [name, setName] = useState(props.task.name)

  const [date, setDate] = useState(moment())




  const getUserData = async (ref) => {
    const db = getFirestore()
    const snap = await getDoc(ref)
    if (snap.exists()) {
      let name = ""
      name = snap.data().firstName.concat(" ", snap.data().lastName)
      setProper(name)

    }
  }


  const toggleCompleteTask = async () => {
    setCompleted(!completed)
    const db = getFirestore()
    const docref = doc(db, "tasks", props.task.id)
    await updateDoc(docref, {
      completed: !completed
    })

  }

  const submit = e => {
    e.preventDefault()
    editTask(name)
  }

  const editTask = async (name) => {
    const db = getFirestore()
    const docref = doc(db, "tasks", props.task.id)
    await updateDoc(docref, {
      name: name
    })

  }

  const removeTask = () => { }

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
    <>
      <TableRow key={props.index}>
        <TableCell>   <Checkbox
            edge="end"
            onChange={handleToggle(props.index)}
            checked={checked.indexOf(props.index) !== -1} /> {props.task.name}</TableCell>
        <TableCell><LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Due Date"
            value={date}
            minDate={moment()}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider></TableCell>
        <TableCell>Assignees</TableCell>
      </TableRow>
      <Divider />
    </>
  );
};