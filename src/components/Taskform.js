import React, {useState} from 'react';

export default function Taskform(props) {
    const [name, setName] = useState([]);


    const submit = e => {
      e.preventDefault()
      if (!name) return
      props.addTask(name)
      setName("")
    }

    return (
      <div className="row">
      <form id ="add-task=form" onSubmit={submit}>
        <input type="text" className = "input col-8 align-self-end" placeholder = "Add task here..." value = {name} onChange={e => setName(e.target.value)}/>
      </form>
      </div>
    )
    }

