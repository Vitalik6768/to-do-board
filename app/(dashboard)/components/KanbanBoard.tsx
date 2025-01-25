"use client"

import { Column } from '@/types'
import { CirclePlus } from 'lucide-react'
import React, { useState } from 'react'
import ColumnContainer from './ColumnContainer'

function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([])
    console.log(columns)

    
    return (
        <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
            <div className='m-auto flex gap-4'>
                <div className='text-white flex gap-4'>{columns.map(column => <ColumnContainer key={column.id} column={column} />)}</div>
                <button 
                    onClick={() => CreateNewColumn()} 
                    className='h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg border-2 border-cyan-950 p-4 ring-2 ring-transparent hover:ring-2 hover:ring-rose-600 text-white flex gap-2'
                >
                    <CirclePlus />
                    Add Column
                </button>
            </div>
        </div>
    )


    function CreateNewColumn() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        }
    
        setColumns([...columns, columnToAdd])
    }
    
}

function generateId() {
    return Math.floor(Math.random() * 1000000).toString();
}


export default KanbanBoard


