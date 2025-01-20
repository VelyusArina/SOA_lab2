import React, { useState } from 'react';

const DeleteLabWork = () => {
    const [labWorkId, setLabWorkId] = useState('');
    const [mockLabWorks, setMockLabWorks] = useState([
        { id: '1', name: 'Lab Work 1', description: 'Description 1', difficulty: 'Easy', discipline: 'Math', coordinates: '20, 30' },
        { id: '2', name: 'Lab Work 2', description: 'Description 2', difficulty: 'Medium', discipline: 'Science', coordinates: '30, 40' },
        { id: '3', name: 'Lab Work 3', description: 'Description 3', difficulty: 'Hard', discipline: 'History', coordinates: '25, 35' },
    ]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleDelete = (e) => {
        e.preventDefault();

        const updatedLabWorks = mockLabWorks.filter(lab => lab.id !== labWorkId);

        if (updatedLabWorks.length === mockLabWorks.length) {
            setError('Лабораторная работа с таким ID не найдена');
            setSuccess(null);
        } else {
            setMockLabWorks(updatedLabWorks);
            setError(null);
            setSuccess('Лабораторная работа успешно удалена');
        }
    };

    return (
        <div>
            <h2>Удалить лабораторную работу по ID</h2>
            <form onSubmit={handleDelete}>
                <label htmlFor="labWorkId">Введите ID лабораторной работы для удаления: </label>
                <input
                    type="text"
                    id="labWorkId"
                    placeholder={`Введите ID`}
                    value={labWorkId}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Удалить лабораторную работу</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            
        </div>
    );
};

export default DeleteLabWork;
