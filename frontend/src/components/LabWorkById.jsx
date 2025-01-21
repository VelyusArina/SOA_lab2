import React, { useState } from 'react';
import axios from 'axios';
import { Table } from './Table';
import config from '../components/config';

const LabWorkById = () => {
    const [labWorkId, setLabWorkId] = useState('');
    const [labWorkData, setLabWorkData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const parseXML = (xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
        const labWork = {};

        // Парсинг данных из XML
        labWork.id = xmlDoc.getElementsByTagName('id')[0]?.textContent || '';
        labWork.name = xmlDoc.getElementsByTagName('name')[0]?.textContent || '';
        labWork.creationDate = xmlDoc.getElementsByTagName('creationDate')[0]?.textContent || '';
        labWork.minimalPoint = xmlDoc.getElementsByTagName('minimalPoint')[0]?.textContent || '';
        labWork.description = xmlDoc.getElementsByTagName('description')[0]?.textContent || '';
        labWork.tunedInWorks = xmlDoc.getElementsByTagName('tunedInWorks')[0]?.textContent === 'true';
        labWork.difficulty = xmlDoc.getElementsByTagName('difficulty')[0]?.textContent || '';

        const coordinates = xmlDoc.getElementsByTagName('coordinates')[0];
        labWork.coordinates = {
            x: coordinates?.getElementsByTagName('x')[0]?.textContent || '',
            y: coordinates?.getElementsByTagName('y')[0]?.textContent || '',
        };

        const discipline = xmlDoc.getElementsByTagName('discipline')[0];
        labWork.discipline = {
            name: discipline?.getElementsByTagName('name')[0]?.textContent || '',
            labsCount: discipline?.getElementsByTagName('labsCount')[0]?.textContent || '',
        };

        return labWork;
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

            const labWork = parseXML(response.data);
            setLabWorkData(labWork);
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
