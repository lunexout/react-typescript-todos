import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Input } from './input'
import { ToDo } from './todo'
import { Todo } from './todos-types'

export const ToDos = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [searchValue, setSearchValue] = useState<string>('')

  const [toDos, setToDos] = useState<Array<Todo>>([])
  const [completedToDos, setCompletedToDos] = useState<Array<Todo>>([])

  const onAddTodo = (value: string) => {
    const isDuplicateToDo = toDos.find(todo => todo.title === value)

    if (isDuplicateToDo) {
      enqueueSnackbar(`${value} successfully added to todo list`, {
        variant: 'error',
        autoHideDuration: 1000,
        onClose: (event, reason, key) => {
          console.log({ event, reason, key })
          enqueueSnackbar(`exlaxans daixura`, {
            variant: 'error'
          })
        }
      })
    } else {
      setToDos(prev => [
        ...prev,
        { id: uuidv4(), title: value, completed: false }
      ])
      setSearchValue('')
      enqueueSnackbar(`${value} successfully added to todo list`, {
        variant: 'success'
      })
    }
  }

  const onRemoveTodo = (id: string, isCompleted: boolean) => {
    if (isCompleted) {
      const completedToDosFiltered = completedToDos.filter(
        todo => todo.id !== id
      )
      setCompletedToDos(completedToDosFiltered)
    } else {
      const removedToDos = toDos.filter(todo => todo.id !== id)
      setToDos(removedToDos)
    }
    enqueueSnackbar(
      `Todo successfully removed ${isCompleted ? 'completed' : 'todo'} list`,
      {
        variant: 'success'
      }
    )
  }

  const onCompleteTodo = (todo: Todo) => {
    setCompletedToDos(prev => [...prev, todo])
    onRemoveTodo(todo.id, false)
  }

  const onEditTodo = (id: string, title: string, callback: () => void) => {
    const findTodo = toDos.find(todo => todo.title === title && id !== todo.id)
    if (findTodo) {
      enqueueSnackbar(
        `Found duplicated todos in the list, please change todo title`,
        {
          variant: 'error'
        }
      )
    } else {
      setToDos(prev =>
        prev.map(todo => {
          if (todo.id === id) {
            return { ...todo, title }
          }
          return todo
        })
      )
      callback()
    }
  }

  return (
    <div className='flex flex-col gap-8 border rounded-lg max-w-screen-lg mx-auto mt-[100px] p-4'>
      <Input
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onClickSubmit={onAddTodo}
      />
      <div className='flex flex-row gap-6 rounded-lg shadow-lg justify-between p-4'>
        {/* TODO */}
        <div className='flex flex-col gap-8'>
          <div className='  inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white'>
            TODOS
          </div>
          <div className='flex flex-col gap-4'>
            {toDos.map(todo => (
              <ToDo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                isCompleted={todo.completed}
                onRemoveTodo={onRemoveTodo}
                onCompleteTodo={onCompleteTodo}
                onEditTodo={onEditTodo}
              />
            ))}
          </div>
        </div>
        {/* COMPLETED */}
        <div className='flex flex-col gap-8'>
          <div className='  inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white'>
            COMPLETED
          </div>
          <div className='flex flex-col gap-4'>
            {completedToDos.map(todo => (
              <ToDo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                isCompleted={todo.completed}
                onRemoveTodo={onRemoveTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
