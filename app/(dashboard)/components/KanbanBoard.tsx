"use client"

import { Column, Id, Task } from '@/types'
import { CirclePlus } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import ColumnContainer from './ColumnContainer'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import TaskCard from './TaskCard'


function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([])
    const columnsIds = useMemo(() => columns.map(col => col.id), [columns])
    const [activeColumnId, setActiveColumnId] = useState<Column | null>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        })
    )

    return (
        <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
            <div className='m-auto flex gap-4'>

                <DndContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    sensors={sensors}
                    onDragMove={onDragOver}
                >

                    <div className='text-white flex gap-4'>
                        <SortableContext items={columns.map(column => column.id)}>
                            {columns.map(
                                column => <ColumnContainer
                                    key={column.id}
                                    column={column}
                                    updateColumn={updateColumn}
                                    deleteColumn={deleteColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter((task) => task.columnId === column.id)}
                                />)}
                        </SortableContext>
                    </div>
                    <button
                        onClick={() => CreateNewColumn()}
                        className='h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg border-2 border-cyan-950 p-4 ring-2 ring-transparent hover:ring-2 hover:ring-rose-600 text-white flex gap-2'
                    >
                        <CirclePlus />
                        Add Column
                    </button>

                    {createPortal(
                        <DragOverlay>
                            {activeColumnId && (<ColumnContainer
                                column={activeColumnId}
                                deleteColumn={deleteColumn}
                                createTask={createTask}
                                updateColumn={updateColumn}
                                deleteTask={deleteTask}
                                updateTask={updateTask}

                                tasks={tasks.filter((task) => task.columnId === activeColumnId.id)}

                            />


                            )}
                            {activeTask && (<TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />)}



                        </DragOverlay>,
                        document.body

                    )
                    }
                </DndContext>

            </div>
        </div>
    )

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event

        if (!over) return

        const activeColumnId = active.id
        const overColumnId = over.id
        if (activeColumnId === overColumnId) return

        //draging task over other task
        const isActiveTask = active.data.current?.type === 'Task'
        const isOverTask = over.data.current?.type === 'Task'

        if (!isActiveTask)return


        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeTaskIndex = tasks.findIndex(task => task.id === active.id)
                const overTaskIndex = tasks.findIndex(task => task.id === over.id)
                     
                
                tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId

                return arrayMove(tasks, activeTaskIndex, overTaskIndex)

            })
        }

        const isOverColumn = over.data.current?.type === 'Column'
        if(isActiveTask && isOverColumn){


            setTasks((tasks) => {
                const activeTaskIndex = tasks.findIndex(task => task.id === active.id)
                const overTaskIndex = tasks.findIndex(task => task.id === over.id)
                     
                
                tasks[activeTaskIndex].columnId = overColumnId

                return arrayMove(tasks, activeTaskIndex, activeTaskIndex)

            })

        }



    }

    function deleteColumn(id: Id) {
        const filteredColumns = columns.filter(column => column.id !== id)
        setColumns(filteredColumns)
        const newTasks = tasks.filter(task => task.columnId !== id)
        setTasks(newTasks)
    }

    function updateColumn(id: Id, title: string) {
        const newColumns = columns.map(col => {
            if (col.id !== id) return col
            return {
                ...col,
                title
            }
        })

        setColumns(newColumns)


    }

    function createTask(columnId: Id) {
        const newTaks: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`
        };

        setTasks([...tasks, newTaks]);
    }

    function updateTask(id: Id, content: string) {
        const newTasks = tasks.map(task => {
            if (task.id !== id) return task
            return {
                ...task,
                content
            }

        })

        setTasks(newTasks)

    }

    function deleteTask(id: Id) {
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)

    }


    function CreateNewColumn() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        }

        setColumns([...columns, columnToAdd])
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Column') {
            setActiveColumnId(event.active.data.current.column)
            return
        }

        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task)
            return
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumnId(null)
        setActiveTask(null)
        const { active, over } = event


        if (!over) return

        const activeColumnId = active.id
        const overColumnId = over.id
        if (activeColumnId === overColumnId) return

        if (activeColumnId != overColumnId) {
            setColumns((columns) => {
                const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId)
                const overColumnIndex = columns.findIndex(col => col.id === overColumnId)
                return arrayMove(columns, activeColumnIndex, overColumnIndex)
            })
        }





    }
}




function generateId() {
    return Math.floor(Math.random() * 1000000).toString();
}





export default KanbanBoard


