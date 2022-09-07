import React, {useState} from 'react'
import {getAuth } from 'firebase/auth'
import { useFirebaseApp, AuthProvider, FirestoreProvider} from 'reactfire'
import App from './App'
import { getFirestore } from 'firebase/firestore'
import { SelectedTaskContext, SelectedProjectContext } from './context';


export default function ProviderLayer() {

    const [selectedTask, setSelectedTask] = useState("assignedto")
    const [selectedProject, setSelectedProject] = useState('')
    
    const db = getFirestore(useFirebaseApp())
    const auth = getAuth(useFirebaseApp())
      
    
    return (
       <AuthProvider sdk={auth}>
           <FirestoreProvider sdk = {db}>
               <SelectedTaskContext.Provider value= {{selectedTask, setSelectedTask}}>
                   <SelectedProjectContext.Provider value={{selectedProject,setSelectedProject}}>
                        <App />
                    </SelectedProjectContext.Provider>
                </SelectedTaskContext.Provider>
            </FirestoreProvider>     
       </AuthProvider> 
    )
}
