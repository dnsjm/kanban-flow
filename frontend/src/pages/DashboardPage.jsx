import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DashboardPage = () => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await api.get('/boards');
                setBoards(response.data);
            } catch (error) {
                console.error('Failed to fetch boards', error);
            }
        };
        fetchBoards();
    }, []);

    const handleCreateBoard = async (e) => {
        e.preventDefault();
        if (!newBoardName.trim()) return;
        try {
            const response = await api.post('/boards', { name: newBoardName });
            setBoards([...boards, response.data]);
            setNewBoardName('');
        } catch (error) {
            console.error('Failed to create board', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl mb-4">My Boards</h1>
            <form onSubmit={handleCreateBoard} className="mb-6">
                <input
                    type="text"
                    className="p-2 border rounded w-full md:w-1/3"
                    placeholder="New board name..."
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-2">
                    Create Board
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map((board) => (
                    <Link key={board.id} to={`/board/${board.id}`}>
                        <div className="bg-gray-200 p-4 rounded shadow hover:bg-gray-300">
                            <h3 className="font-bold">{board.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
