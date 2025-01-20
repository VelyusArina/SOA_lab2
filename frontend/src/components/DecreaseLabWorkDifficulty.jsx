import React, { useState } from 'react';

const DecreaseLabWorkDifficulty = () => {
    const [mockLabWorks, setMockLabWorks] = useState([
        { id: '1', name: 'Lab Work 1', difficulty: 'HARD', description: 'Description 1', discipline: 'Math', coordinates: '20, 30' },
        { id: '2', name: 'Lab Work 2', difficulty: 'MEDIUM', description: 'Description 2', discipline: 'Science', coordinates: '30, 40' },
        { id: '3', name: 'Lab Work 3', difficulty: 'NORMAL', description: 'Description 3', discipline: 'History', coordinates: '25, 35' },
    ]);
    const [labWorkId, setLabWorkId] = useState('');
    const [steps, setSteps] = useState(1); // Число шагов для понижения сложности
    const [updatedLabWork, setUpdatedLabWork] = useState(null);
    const [error, setError] = useState('');

    // Маппинг сложности на числовые значения
    const difficultyLevels = [
        'NORMAL',
        'HARD',
        'VERY_HARD',
        'IMPOSSIBLE',
        'TERRIBLE'
    ];

    const handleLabWorkIdChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleStepsChange = (e) => {
        setSteps(Number(e.target.value));
    };

    const handleDecreaseDifficulty = () => {
        const foundLabWork = mockLabWorks.find(lab => lab.id === labWorkId);

        if (foundLabWork) {
            const currentDifficultyIndex = difficultyLevels.indexOf(foundLabWork.difficulty);
            const newDifficultyIndex = Math.max(currentDifficultyIndex - steps, 0); // Минимальная сложность - "NORMAL"
            const newDifficulty = difficultyLevels[newDifficultyIndex];

            // Обновление сложности лабораторной работы
            setUpdatedLabWork({
                ...foundLabWork,
                difficulty: newDifficulty,
            });

            setError('');
        } else {
            setUpdatedLabWork(null);
            setError('Лабораторная работа не найдена');
        }
    };

    return (
        <div>
            <h2>Понизить сложность лабораторной работы</h2>

            {/* Ввод ID лабораторной работы */}
            <div>
                <label htmlFor="labWorkId">Введите ID лабораторной работы: </label>
                <input
                    type="text"
                    id="labWorkId"
                    placeholder={`Введите ID`}
                    value={labWorkId}
                    onChange={handleLabWorkIdChange}
                    required
                />
            </div>

            {/* Ввод числа шагов для понижения сложности */}
            <div>
                <label htmlFor="steps">Шаги понижения сложности: </label>
                <input
                    type="number"
                    id="steps"
                    value={steps}
                    onChange={handleStepsChange}
                    min="1"
                    required
                />
            </div>

            <button onClick={handleDecreaseDifficulty}>Понизить сложность</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {updatedLabWork && (
                <div>
                    <h3>Обновленная лабораторная работа</h3>
                    <p>ID: {updatedLabWork.id}</p>
                    <p>Название: {updatedLabWork.name}</p>
                    <p>Новая сложность: {updatedLabWork.difficulty}</p>
                    <p>Описание: {updatedLabWork.description}</p>
                    <p>Дисциплина: {updatedLabWork.discipline}</p>
                    <p>Координаты: {updatedLabWork.coordinates}</p>
                </div>
            )}
        </div>
    );
};

export default DecreaseLabWorkDifficulty;
