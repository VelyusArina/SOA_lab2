import React, { useState } from 'react';

const UpdateLabWork = () => {
    const [labWorkId, setLabWorkId] = useState('');
    const [labWorkData, setLabWorkData] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: '',
        description: '',
        difficulty: '',
        discipline: '',
        coordinates: '',
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleUpdateChange = (e) => {
        setUpdatedData({
            ...updatedData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Имитация запроса с фиктивными данными
        const mockLabWorks = [
            { id: '1', name: 'Lab Work 1', description: 'Description 1', difficulty: 'EASY', discipline: 'Math', coordinates: '20, 30' },
            { id: '2', name: 'Lab Work 2', description: 'Description 2', difficulty: 'MEDIUM', discipline: 'Science', coordinates: '30, 40' },
            { id: '3', name: 'Lab Work 3', description: 'Description 3', difficulty: 'HARD', discipline: 'History', coordinates: '25, 35' },
        ];

        const foundLabWork = mockLabWorks.find(lab => lab.id === labWorkId);

        if (foundLabWork) {
            setLabWorkData(foundLabWork);
            setUpdatedData({
                name: foundLabWork.name,
                description: foundLabWork.description,
                difficulty: foundLabWork.difficulty,
                discipline: foundLabWork.discipline,
                coordinates: foundLabWork.coordinates,
            });
            setError(null);
        } else {
            setLabWorkData(null);
            setError('Lab work not found');
        }
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        // Имитация обновления лабораторной работы
        console.log('Updated data:', updatedData);
        setError(null);

        // Здесь вы можете отправить обновленные данные на сервер или выполнить другой запрос.
    };

    return (
        <div>
            <h2>Обновить лабораторную работу</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="labWorkId">Введите ID лабораторной работы: </label>
                <input
                    type="text"
                    id="labWorkId"
                    placeholder="Введите ID"
                    value={labWorkId}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Найти лабораторную работу</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {labWorkData && (
                <div>
                    <h3>Редактировать лабораторную работу</h3>
                    <form onSubmit={handleUpdateSubmit}>
                        <div>
                            <label htmlFor="name">Название:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={updatedData.name}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Описание:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={updatedData.description}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="difficulty">Сложность:</label>
                            <select
                                name="difficulty"
                                id="difficulty"
                                value={updatedData.difficulty}
                                onChange={handleUpdateChange}
                                required
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                                <option value="VERY_HARD">VERY HARD</option>
                                <option value="IMPOSSIBLE">IMPOSSIBLE</option>
                                <option value="TERRIBLE">TERRIBLE</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="discipline">Дисциплина:</label>
                            <input
                                type="text"
                                id="discipline"
                                name="discipline"
                                value={updatedData.discipline}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="coordinates">Координаты:</label>
                            <input
                                type="text"
                                id="coordinates"
                                name="coordinates"
                                value={updatedData.coordinates}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <button type="submit">Обновить</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateLabWork;
