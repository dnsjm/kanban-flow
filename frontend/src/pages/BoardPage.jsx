import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import api from '../services/api';
import Column from '../components/Column';
import SortableTaskCard from '../components/SortableTaskCard'; // Will create this next

const BoardPage = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [columns, setColumns] = useState([]);
    const [tasks, setTasks] = useState({}); // Tasks keyed by column id

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await api.get(`/boards/${boardId}`);
                const boardData = response.data;
                setBoard(boardData);
                setColumns(boardData.columns || []);
                
                const tasksByColumn = (boardData.columns || []).reduce((acc, column) => {
                    acc[column.id] = column.tasks || [];
                    return acc;
                }, {});
                setTasks(tasksByColumn);
            } catch (error) {
                console.error('Failed to fetch board', error);
            }
        };
        fetchBoard();
    }, [boardId]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId || over.id;
        const activeId = active.id;
        const overId = over.id;

        if (activeContainer === overContainer) {
            // Reordering within the same column
            setTasks(prev => ({
                ...prev,
                [activeContainer]: arrayMove(prev[activeContainer], active.data.current.sortable.index, over.data.current.sortable.index)
            }));
            // API call to update task order in a column would go here
        } else {
            // Moving to a different column
            const activeItems = tasks[activeContainer];
            const overItems = tasks[overContainer];
            const activeIndex = active.data.current.sortable.index;

            const [movedItem] = activeItems.splice(activeIndex, 1);
            movedItem.columnId = overContainer; // This is a frontend-only assumption

            const overIndex = over.id in tasks[overContainer] 
                ? over.data.current.sortable.index 
                : overItems.length;

            overItems.splice(overIndex, 0, movedItem);

            setTasks(prev => ({
                ...prev,
                [activeContainer]: [...activeItems],
                [overContainer]: [...overItems],
            }));

            try {
                // API call to update the task's column
                await api.put(`/tasks/${activeId}`, { ...movedItem, column: { id: overContainer } });
            } catch (error) {
                console.error("Failed to move task", error);
                // Revert state on error
            }
        }
    };

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="container mx-auto mt-10">
                <h1 className="text-3xl font-bold mb-6">{board.name}</h1>
                <div className="flex space-x-4">
                    {columns.map((column) => (
                        <Column key={column.id} id={column.id} title={column.name}>
                            <SortableContext items={tasks[column.id]?.map(t => t.id) || []}>
                                {(tasks[column.id] || []).map(task => (
                                    <SortableTaskCard key={task.id} task={task} />
                                ))}
                            </SortableContext>
                        </Column>
                    ))}
                </div>
            </div>
        </DndContext>
    );
};

export default BoardPage;
