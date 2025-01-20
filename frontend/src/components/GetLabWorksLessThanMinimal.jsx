import React, { useState } from 'react';

const GetLabWorksLessThanMinimal = () => {
    const [mockLabWorks, setMockLabWorks] = useState([
        { id: '1', name: 'Lab Work 1', minimal: 3, description: 'Description 1', difficulty: 'Easy', discipline: 'Math', coordinates: '20, 30' },
        { id: '2', name: 'Lab Work 2', minimal: 8, description: 'Description 2', difficulty: 'Medium', discipline: 'Science', coordinates: '30, 40' },
        { id: '3', name: 'Lab Work 3', minimal: 2, description: 'Description 3', difficulty: 'Hard', discipline: 'History', coordinates: '25, 35' },
    ]);
    const [minValue, setMinValue] = useState('');
    const [count, setCount] = useState(0);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setMinValue(e.target.value);
    };

    const getLabWorksLessThanMinimal = () => {
        const parsedValue = parseFloat(minValue);

        if (isNaN(parsedValue)) {
            setError('Пожалуйста, введите числовое значение');
            setCount(0);
        } else {
            setError('');
            const countOfLabs = mockLabWorks.filter(lab => lab.minimal < parsedValue).length;
            setCount(countOfLabs);
        }
    };

    return (
        <div>
            <h2>Вернуть количество объектов, где значение minimal меньше заданного</h2>
            <div>
                <label htmlFor="minValue">Введите минимальное значение: </label>
                <input
                    type="number"
                    id="minValue"
                    value={minValue}
                    onChange={handleInputChange}
                    placeholder="Введите минимальное значение"
                />
                <button onClick={getLabWorksLessThanMinimal}>Посчитать лабораторные работы</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {count !== null && (
                <div>
                    <p style={{
                        fontSize: '18px',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        backgroundColor: 'rgb(18,31,69)',
                        padding: '10px',
                        borderRadius: '5px',
                        maxWidth: '700px',
                    }}>
                        Количество лабораторных работ, где minimal меньше {minValue}: <span
                            style={{color: '#399dff'}}>{count}</span>
                        </p>
                </div>
                )}
        </div>
    );
};

export default GetLabWorksLessThanMinimal;
