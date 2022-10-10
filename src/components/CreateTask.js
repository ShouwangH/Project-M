import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getFirestore, addDoc, collection, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function CreateTask() {
  const [name, setName] = useState()

  const [taskName, setTaskName] = useState()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const submitTask = st => {
    st.preventDefault()
    console.log(st)
    if (!taskName) return
    addTask(taskName)
    setTaskName("")
  }

  const addTask = async (item) => {
    const db = getFirestore()
    const docref = await addDoc(collection(db,"tasks"), {name:item, /*createdby:currentUser.userId,*/ completed:false})
    await updateDoc(docref, {
      id:docref.id, 
      timestamp: serverTimestamp()
    })
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)};
  const handleClose = () => {
    setOpen(false)};
  

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Create Task
      </Button>

      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-modal-title" variant="h6" component="h2">
            Task Description
          </h2>
          <TextField id="project-name" label="Enter Task..." value={name}
           onChange={e => setName(e.target.value)} margin="normal"/>
          {/*
          <br></br>
          <b id="modal-modal-description" sx={{ mt: 2 }}>
            Project Description
          </b>
          <TextField id="outlined-multiline-static"
          multiline
          rows={4}
          defaultValue="Enter Project Description..."
          margin="normal" />
          */}
          <br></br>
          <Button onClick={handleClose}>Create Task</Button>

        </Box>
      </Modal>
    </>
  )
}
