import { Id, Task } from '@/types'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'


interface Props {
    task: Task
    deleteTask: (id: Id) => void
}


function TaskCard({task, deleteTask}: Props) {
    const [mouseOver, setMouseOver] = useState(false)
  return (
    <div 
    onMouseEnter={() => setMouseOver(true)}
    onMouseLeave={() => setMouseOver(false)}
    className='bg-slate-950 text-white p-2.5 rounded-md items-center flex text-left h-[100px] hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative justify-between'>
        {task.content}
        {mouseOver && <Trash2 onClick={() => deleteTask(task.id)} className='stroke-white right-4 top-1/2' />}
      
    </div>
  )
}

export default TaskCard
