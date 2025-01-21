import React, { useState } from 'react';
import axios from 'axios';
import { Table } from './Table';
import config from '../config';
import xml2js from 'xml2js';

const LabWorkById = () => {
    const [labWorkId, setLabWorkId] = useState('');
    const [labWorkData, setLabWorkData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!labWorkId) {
            setError('Пожалуйста, введите ID лабораторной работы');
            return;
        }

        setError(null);

        try {
            const response = await axios.get(`${config.API_BASE_URL}/labworks/${labWorkId}`, {
                headers: { 'Content-Type': 'application/xml' },
            });

            xml2js.parseString(response.data, (err, result) => {
                if (err) {
                    setError('Ошибка при парсинге XML');
                } else {
                    setLabWorkData(result.LabWork);
                    setError(null);
                }
            });
        } catch (err) {
            setLabWorkData(null);
            if (err.response) {
                if (err.response.status === 400) {
                    setError('Неверный запрос (400)');
                } else if (err.response.status === 404) {
                    setError('Лабораторная работа не найдена (404)');
                } else if (err.response.status === 500) {
                    setError('Ошибка сервера (500)');
                } else {
                    setError('Неизвестная ошибка');
                }
            } else if (err.request) {
                setError('Ошибка при отправке запроса');
            } else {
                setError('Неизвестная ошибка');
            }
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
