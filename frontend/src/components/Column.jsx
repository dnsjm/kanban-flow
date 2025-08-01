import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const Column = ({ id, title, children }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className="bg-gray-100 p-4 rounded-lg shadow-md w-80 flex-shrink-0"
        >
            <h2 className="text-lg font-bold mb-4 text-gray-800">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};

export default Column;
