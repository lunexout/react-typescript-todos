import { useState } from 'react'
import { Input } from './input'
import { Todo } from './todos-types'

type Props = {
  id: string
  title: string
  isCompleted: boolean
  onRemoveTodo: (id: string, isCompleted: boolean) => void
  onCompleteTodo?: (todo: Todo) => void
  onEditTodo?: (id: string, title: string, callback: () => void) => void
}

export const ToDo = ({
  id,
  isCompleted,
  title,
  onRemoveTodo,
  onCompleteTodo,
  onEditTodo
}: Props) => {
  const [editedTodo, setEditedTodo] = useState(title)
  const [isEditOpen, setIsEdit] = useState(false)

  const onClickSubmit = () => {
    onEditTodo?.(id, editedTodo, () => {
      setIsEdit(false)
    })
  }

  return (
    <div
      className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ${
        isCompleted ? 'dark:bg-blue-800' : 'dark:bg-gray-800'
      } dark:border-gray-700`}
    >
      <div className='my-4'>
        {isEditOpen ? (
          <Input
            searchValue={editedTodo}
            setSearchValue={setEditedTodo}
            onClickSubmit={onClickSubmit}
            submitLabel='Edit todo'
          />
        ) : (
          <h5 className='text-white'>{title}</h5>
        )}
      </div>
      <div className='flex flex-row gap-4'>
        {onCompleteTodo && (
          <a
            href='#'
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            onClick={() => {
              onCompleteTodo({ id, title, completed: true })
            }}
          >
            Complete
          </a>
        )}
        {onEditTodo && (
          <>
            {isEditOpen ? (
              <a
                href='#'
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                onClick={() => setIsEdit(false)}
              >
                Close
              </a>
            ) : (
              <a
                href='#'
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
                onClick={() => setIsEdit(prev => !prev)}
              >
                Edit
              </a>
            )}
          </>
        )}
        <a
          href='#'
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
          onClick={() => onRemoveTodo(id, isCompleted)}
        >
          Remove
        </a>
      </div>
    </div>
  )
}
