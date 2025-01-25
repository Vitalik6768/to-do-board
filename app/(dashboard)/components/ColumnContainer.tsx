
interface Props {
    column: Column
    deleteColumn: (id: Id) => void
    updateColumn: (id: Id, title: string) => void
}


import { Badge } from '@/components/ui/badge'
import { Column, Id } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { Pencil, Trash2 } from 'lucide-react'
import { CSS } from '@dnd-kit/utilities'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'

function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn } = props

    const [editMode, setEditMode] = useState(false)

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
            <div className='flex flex-grow'>Content</div>
            <div>
                footer
            </div>


        </div>
    )




}

export default ColumnContainer
