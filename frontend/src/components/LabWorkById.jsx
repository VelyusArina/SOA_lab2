import React, { useState } from 'react';

const LabWorkById = () => {
    const [labWorkId, setLabWorkId] = useState('');
    const [labWorkData, setLabWorkData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Имитация запроса с фиктивными данными
        const mockLabWorks = [
            { id: '1', name: 'Lab Work 1', description: 'Description 1', difficulty: 'Easy', discipline: 'Math', coordinates: { x: 20, y: 30 } },
            { id: '2', name: 'Lab Work 2', description: 'Description 2', difficulty: 'Medium', discipline: 'Science', coordinates: { x: 30, y: 40 } },
            { id: '3', name: 'Lab Work 3', description: 'Description 3', difficulty: 'Hard', discipline: 'History', coordinates: { x: 25, y: 35 } },
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="labWorkId">Введите ID лабораторной работы: </label>
                <input
                    type="text"
                    id="labWorkId"
                    value={labWorkId}
                    placeholder={`Введите ID`}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Получить</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {labWorkData && (
                <div>
                    <h3>Lab Work Details</h3>
                    <p><strong>ID:</strong> {labWorkData.id}</p>
                    <p><strong>Name:</strong> {labWorkData.name}</p>
                    <p><strong>Description:</strong> {labWorkData.description}</p>
                    <p><strong>Difficulty:</strong> {labWorkData.difficulty}</p>
                    <p><strong>Discipline:</strong> {labWorkData.discipline}</p>
                    <p><strong>Coordinates:</strong> ({labWorkData.coordinates.x}, {labWorkData.coordinates.y})</p>
                </div>
            )}
        </div>
    );
};

export default LabWorkById;
