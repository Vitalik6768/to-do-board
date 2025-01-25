
interface Props {
    column: Column
}


import { Badge } from '@/components/ui/badge'
import { Column } from '@/types'
import { Trash2 } from 'lucide-react'
import React from 'react'

function ColumnContainer(props: Props) {
    const { column } = props


    return (
        <div className='bg-slate-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col '>
            <div className='bg-black text-md h-[60px] courser-grab rounded-md rounded-b-none p-3 font-bold border-b-2 border-2 flex justify-between'>
                <div className='flex gap-2'>
                    <Badge variant={'destructive'} className=' text-white flex justify-center items-center text-sm'>0</Badge>
                    {column.title}

                </div>
                <Trash2 className='text-white cursor-pointer hover:text-red-500'/>
            </div>
            <div className='flex flex-grow'>Content</div>
            <div>
                footer
            </div>


        </div>
    )
}

export default ColumnContainer
