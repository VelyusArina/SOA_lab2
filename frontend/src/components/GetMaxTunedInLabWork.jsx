import React, { useState } from 'react';
import { Table } from './Table';


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
            <h2>Лабораторная работа с максимальным значением tunedInWorks</h2>
            <button onClick={getMaxTunedInLabWork}>Получить</button>

            {maxTunedInLabWork && (
                <div>
                    <Table labWorkData={maxTunedInLabWork} />
                </div>
            )}
        </div>
    );
};

export default GetMaxTunedInLabWork;
