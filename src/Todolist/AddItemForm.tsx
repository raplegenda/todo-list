import { Add } from '@mui/icons-material';
import {IconButton, TextField } from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title:string) => void
  }
  
  export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.key === 'Enter') {
        addTask();
      }
    }
    const addTask = () => {
      if (newTaskTitle.trim() !== "") {
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle("");
      } else {
        setError("Поле обязательно");
      }
    }
  
    return <div>
      <TextField size='small' 
                 value={newTaskTitle}
                 onChange={onNewTitleChangeHandler}
                 onKeyDown={onKeyPressHandler}
                 label={"Type name"}
                 error={!!error}
                 helperText={error}
      />
      <IconButton onClick={addTask}>
        <Add></Add>
      </IconButton>
    </div>
  }