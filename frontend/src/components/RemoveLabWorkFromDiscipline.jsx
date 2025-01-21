import React, { useState } from 'react';
import axios from 'axios';
import config from './config';

const RemoveLabWorkFromDiscipline = () => {
    const [disciplineId, setDisciplineId] = useState('');
    const [labWorkId, setLabWorkId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');

    const handleDisciplineIdChange = (e) => {
        setDisciplineId(e.target.value);
    };

    const handleLabWorkIdChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleRemoveLabWork = async () => {
        try {
            if (!disciplineId || !labWorkId) {
                setError('Оба ID (discipline-id и labwork-id) должны быть заполнены');
                setResponseMessage('');
                return;
            }

            const response = await axios.delete(`${config.API_BASE_URL}/bars/discipline/${disciplineId}/labwork/${labWorkId}/remove`, {
                headers: {
                    'Content-Type': 'application/xml',
                },
            });

            setResponseMessage('Лабораторная работа успешно удалена из дисциплины.');
            setError('');
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    setError('Лабораторная работа или дисциплина не найдены.');
                } else if (err.response.status === 400) {
                    setError('Некорректные параметры запроса.');
                } else if (err.response.status === 409) {
                    setError('Конфликт: лабораторная работа не может быть удалена, возможно, она привязана к другим данным.');
                } else if (err.response.status === 500) {
                    setError('Ошибка сервера, попробуйте позже.');
                } else {
                    setError('Произошла ошибка, пожалуйста, попробуйте снова.');
                }
            } else {
                setError('Не удалось подключиться к серверу.');
            }

            setResponseMessage('');
        }
    };

    return (
        <div>
            <h2>Удалить лабораторную работу из программы дисциплины</h2>
            <div>
                <label htmlFor="disciplineId">Введите ID дисциплины: </label>
                <input
                    type="number"
                    id="disciplineId"
                    value={disciplineId}
                    onChange={handleDisciplineIdChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="labWorkId">Введите ID лабораторной работы: </label>
                <input
                    type="number"
                    id="labWorkId"
                    value={labWorkId}
                    onChange={handleLabWorkIdChange}
                    required
                />
            </div>

            <button onClick={handleRemoveLabWork}>Удалить лабораторную работу</button>

            {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RemoveLabWorkFromDiscipline;
