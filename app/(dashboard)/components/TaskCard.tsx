import { Input } from '@/components/ui/input'
import { Id, Task } from '@/types'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'


interface Props {
    task: Task
    deleteTask: (id: Id) => void
    updateTask: (id: Id, content: string) => void
}


function TaskCard({ task, deleteTask, updateTask }: Props) {

    const [mouseOver, setMouseOver] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const toggleEditMode = () => {
        setEditMode((prev) => !prev)
        setMouseOver(false)
    }

    if (editMode) {
        return (
            <div

                className='bg-slate-950 text-white p-2.5 rounded-md items-center flex text-left h-[100px] hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative justify-between'>
                <Input
                    className='h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none'
                    value={task.content}
                    autoFocus
                    placeholder='Task content'
                    onBlur={toggleEditMode}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey) {
                            toggleEditMode()
                        }
                    }}
                    onChange={(e) => {
                        updateTask(task.id, e.target.value)
                    }}
                />

            </div>

        )
    }

    return (
        <div
            onClick={toggleEditMode}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            className='bg-slate-950 text-white p-2.5 rounded-md items-center flex text-left h-[100px] hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative justify-between'>
            <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap'>
                {task.content}
            </p>

            {mouseOver && <Trash2 onClick={() => deleteTask(task.id)} className='stroke-white right-4 top-1/2' />}

        </div>
    )
}

export default TaskCard
