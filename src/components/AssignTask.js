import React, { useEffect, useState } from 'react';


import {doc, getFirestore, updateDoc} from 'firebase/firestore'
import { updateCurrentUser } from 'firebase/auth';

export default function AssignTask(props) {
    
    const [assignee, setAssignee] = useState("")

    const assignTask = async (input) => {  
      const db = getFirestore()
      const docref = doc(db, "tasks", props.task.id)
      await updateDoc(docref, {
        assignedto:input[0].userId,
        assignedby:props.currentUser.userId
    })
    setAssignee(input[0].userId)
      
    }
        

 

  }
