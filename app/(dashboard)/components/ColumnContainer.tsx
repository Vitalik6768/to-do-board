
interface Props {
    column: Column
    deleteColumn: (id: Id) => void
    updateColumn: (id: Id, title: string) => void
    createTask: (columnId: Id) => void
    tasks: Task[]
    deleteTask: (id: Id) => void
    updateTask: (id: Id, content: string) => void
}


import { Badge } from '@/components/ui/badge'
import { Column, Id, Task } from '@/types'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { Pencil, Trash2 } from 'lucide-react'
import { CSS } from '@dnd-kit/utilities'
import React, { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TaskCard from './TaskCard'

function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask} = props
    const [editMode, setEditMode] = useState(false)

    const taskIds = useMemo(() => {
        return tasks.map((task) => task.id)
    }, [tasks])



    const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable(
        {
            id: column.id,
            data: {
                type: 'Column',
                column
            },
            disabled: editMode,
        })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return <div ref={setNodeRef} style={style} className='bg-slate-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-30 border-2 border-white' />
    }




    return (

        <div
            ref={setNodeRef}
            style={style}
            className='bg-slate-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col '>


            <div {...attributes} {...listeners}
                onClick={() => setEditMode(true)}

                className='bg-black text-md h-[60px] courser-grab rounded-md rounded-b-none p-3 font-bold border-b-2 border-2 flex justify-between'>
                <div className='flex gap-2'>

                    <Badge variant={'destructive'} className=' text-white flex justify-center items-center text-sm'>0</Badge>

                 
                    {!editMode && column.title}
                    {editMode && <Input value={column.title} onChange={e => updateColumn(column.id, e.target.value)} autoFocus onBlur={() => setEditMode(false)} type='text' onKeyDown={e =>{
                        if(e.key !== 'Enter')return
                        setEditMode(false)
                        
                    }} />}

                </div>
                <Trash2 onClick={() => deleteColumn(column.id)} className='text-white cursor-pointer hover:text-red-500' />
            </div>
            <div className='flex flex-grow flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto'>
                <SortableContext items={taskIds}> 
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                ))}
                </SortableContext>

            </div>

            <div className='flex justify-center items-center p-2'>

            <Button onClick={() => {
                createTask(column.id)
            }} className='text-white w-full'>Add Task</Button>


            </div>


        </div>
    )




}

export default ColumnContainer
