import React, { useState } from 'react';
import config from '../config';

const GetLabWorksLessThanMinimal = () => {
    const [minValue, setMinValue] = useState('');
    const [count, setCount] = useState(0);
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        setMinValue(e.target.value);
    };

    const getLabWorksLessThanMinimal = async () => {
        if (!minValue) {
            setFormError('Пожалуйста, введите минимальное значение');
            setCount(0);
            return;
        }
        setFormError('');

        const parsedValue = parseFloat(minValue);

        if (isNaN(parsedValue)) {
            setError('Пожалуйста, введите числовое значение');
            setCount(0);
        } else {
            setError('');
            try {
                const response = await fetch(`${config.API_BASE_URL}/labworks/count/minimal?value=${parsedValue}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/xml',
                    },
                });

                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error('Неверный запрос (400)');
                    } else if (response.status === 404) {
                        throw new Error('Лабораторные работы не найдены (404)');
                    } else if (response.status === 500) {
                        throw new Error('Ошибка сервера (500)');
                    } else {
                        throw new Error('Ошибка при получении данных');
                    }
                }

                const xmlData = await response.text();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

                const countOfLabs = xmlDoc.getElementsByTagName('LabWork').length;

                setCount(countOfLabs);
                setErrorMessage('');
            } catch (error) {
                setErrorMessage(error.message);
                setCount(0);
            }
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
                    required
                />
                <button onClick={getLabWorksLessThanMinimal}>Посчитать лабораторные работы</button>
            </div>

            {formError && <p style={{ color: 'red' }}>{formError}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
