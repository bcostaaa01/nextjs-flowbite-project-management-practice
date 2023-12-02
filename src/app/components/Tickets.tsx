'use client'
import React, {useState} from 'react';
import {Table, Flowbite} from 'flowbite-react';
import {Badge} from 'flowbite-react';
import {HiCheck, HiClock} from 'react-icons/hi';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

interface Task {
    id: number;
    name: string;
    status: string;
}

interface Props {
    className?: string;
}

const customTheme = {
    button: {
        color: {
            success: 'bg-green-100',
            warning: 'bg-yellow-100',
        },
    },
};

const DRAG_TYPES = 'TASK';

const TicketsComponent = (props: Props) => {
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, name: 'Implement User Authentication', status: 'Done'},
        {id: 2, name: 'Optimize Performance', status: 'In Progress'},
        {id: 3, name: 'Design Dashboard UI', status: 'In Progress'},
        {id: 4, name: 'Fix Cross-browser Compatibility', status: 'Done'},
    ]);

    const moveTask = (dragIndex: number, hoverIndex: number) => {
        const dragTask = tasks[dragIndex];
        const updatedTasks = [...tasks];
        updatedTasks.splice(dragIndex, 1);
        updatedTasks.splice(hoverIndex, 0, dragTask);
        setTasks(updatedTasks);
    };

    const Task = ({task, index}: { task: Task; index: number }) => {
        const [, drag] = useDrag({
            type: DRAG_TYPES,
            item: {index},
        });

        const [, drop] = useDrop({
            accept: DRAG_TYPES,
            hover: (draggedItem: { index: number }) => {
                if (draggedItem.index !== index) {
                    moveTask(draggedItem.index, index);
                }
            },
        });

        return (
            <tr ref={(node) => drag(drop(node))}>
                <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white p-2">{task.name}</td>
                <td className="p-3">
                    {task.status === 'Done' ? (
                        <Badge color="success" className="p-2 rounded-md">
                            <HiCheck/>
                            {task.status}
                        </Badge>
                    ) : (
                        <Badge color="warning" className="p-2 rounded-md">
                            <HiClock/>
                            {task.status}
                        </Badge>
                    )}
                </td>
            </tr>
        );
    };

    return (
        <div className="flex flex-wrap gap-4 p-4">
            <DndProvider backend={HTML5Backend}>
                <Flowbite theme={{theme: customTheme}}>
                    <Table hoverable>
                        <thead className="bg-gray-100 p-2">
                        <tr>
                            <th className="p-2">Task</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y bg-gray-50">
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index}/>
                        ))}
                        </tbody>
                    </Table>
                </Flowbite>
            </DndProvider>
        </div>
    );
};

export default TicketsComponent;




