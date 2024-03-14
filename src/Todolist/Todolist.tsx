import { ChangeEvent } from "react";
import { FilterValueType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Clear, Delete } from "@mui/icons-material";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


type PropsType = {
  id: string
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValueType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}


export function Todolist(props: PropsType) {

  const onAllCLickHandler = () => props.changeFilter('all', props.id);
  const onActiveCLickHandler = () => props.changeFilter('active', props.id);
  const onCompletedCLickHandler = () => props.changeFilter('completed', props.id);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }

  const addTask = (title: string) => [
    props.addTask(title, props.id)
  ]

  return <div className="box">
    <h3 className="box-header">  <EditableSpan title={props.title} onChange={changeTodolistTitle} />
      <IconButton onClick={removeTodolist}>
        <Clear fontSize="small" />
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask} />
    <ul>
      {
        props.tasks.map(t => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id)
          }
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
          }
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
          }
          return <li key={t.id} className="task-name">
            <div className="task-info">
            <Checkbox onChange={onChangeStatusHandler}
              checked={t.isDone} />
            <EditableSpan title={t.title}
              onChange={onChangeTitleHandler} />
            </div>
            <IconButton onClick={onRemoveHandler}>
              <Delete fontSize="small" />
            </IconButton>
          </li>
        })
      }
    </ul>
    <div>
      <Button variant={props.filter === 'all' ? "contained" : "text"} onClick={onAllCLickHandler}>All</Button>
      <Button variant={props.filter === 'active' ? "contained" : "text"} onClick={onActiveCLickHandler}>Active</Button>
      <Button variant={props.filter === 'completed' ? "contained" : "text"} onClick={onCompletedCLickHandler}>Completed</Button>
    </div>
  </div>
}