import React, { useState } from 'react';
import { Table } from './Table';

const LabWorkById = () => {
    const [labWorkId, setLabWorkId] = useState('');
    const [labWorkData, setLabWorkData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock data for lab works
        const mockLabWorks = [
            { id: '1', name: 'Lab Work 1', description: 'Description 1', difficulty: 'Easy', discipline: 'Math', coordinates: '20, 30' },
            { id: '2', name: 'Lab Work 2', description: 'Description 2', difficulty: 'Medium', discipline: 'Science', coordinates: '30, 40' },
            { id: '3', name: 'Lab Work 3', description: 'Description 3', difficulty: 'Hard', discipline: 'History', coordinates: '25, 35' },
        ];

        const foundLabWork = mockLabWorks.find(lab => lab.id === labWorkId);

        if (foundLabWork) {
            setLabWorkData(foundLabWork);
            setError(null);
        } else {
            setLabWorkData(null);
            setError('Lab work not found');
        }
    };

    return (
        <div>
            <h2>Получить лабораторную работу по ID</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="labWorkId">Введите ID лабораторной работы: </label>
                <input
                    type="text"
                    id="labWorkId"
                    value={labWorkId}
                    placeholder="Введите ID"
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Получить</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {labWorkData && <Table labWorkData={labWorkData} />}
        </div>
    );
};

export default LabWorkById;