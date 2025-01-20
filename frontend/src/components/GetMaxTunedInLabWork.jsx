import React, { useState } from 'react';

const GetMaxTunedInLabWork = () => {
    const [mockLabWorks, setMockLabWorks] = useState([
        { id: '1', name: 'Lab Work 1', tunedInWorks: 5, description: 'Description 1', difficulty: 'Easy', discipline: 'Math', coordinates: '20, 30' },
        { id: '2', name: 'Lab Work 2', tunedInWorks: 8, description: 'Description 2', difficulty: 'Medium', discipline: 'Science', coordinates: '30, 40' },
        { id: '3', name: 'Lab Work 3', tunedInWorks: 3, description: 'Description 3', difficulty: 'Hard', discipline: 'History', coordinates: '25, 35' },
    ]);
    const [maxTunedInLabWork, setMaxTunedInLabWork] = useState(null);

    const getMaxTunedInLabWork = () => {
        const maxLabWork = mockLabWorks.reduce((max, lab) => {
            return lab.tunedInWorks > max.tunedInWorks ? lab : max;
        }, mockLabWorks[0]);

        setMaxTunedInLabWork(maxLabWork);
    };

    return (
        <div>
            <h2>Вернуть объект с максимальным значением tunedInWorks</h2>
            <button onClick={getMaxTunedInLabWork}>Получить</button>

            {maxTunedInLabWork && (
                <div>
                    <h3>Лабораторная работа с максимальным значением tunedInWorks:</h3>
                    <p>ID: {maxTunedInLabWork.id}</p>
                    <p>Название: {maxTunedInLabWork.name}</p>
                    <p>Tuned In Works: {maxTunedInLabWork.tunedInWorks}</p>
                    <p>Описание: {maxTunedInLabWork.description}</p>
                    <p>Сложность: {maxTunedInLabWork.difficulty}</p>
                    <p>Дисциплина: {maxTunedInLabWork.discipline}</p>
                    <p>Координаты: {maxTunedInLabWork.coordinates}</p>
                </div>
            )}
        </div>
    );
};

export default GetMaxTunedInLabWork;
