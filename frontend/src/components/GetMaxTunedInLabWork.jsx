import React, { useState } from 'react';
import { Table } from './Table';
import config from '../components/config';

const GetMaxTunedInLabWork = () => {
    const [maxTunedInLabWork, setMaxTunedInLabWork] = useState(null);
    const [error, setError] = useState(null);

    const getMaxTunedInLabWork = async () => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/labworks/max-tuned-in`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/xml',
                },
            });

            // Проверяем статус ответа
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Лабораторная работа не найдена (404)');
                } else if (response.status === 500) {
                    throw new Error('Ошибка сервера (500)');
                } else {
                    throw new Error('Ошибка при получении данных');
                }
            }

            // Преобразуем XML в текст
            const xmlData = await response.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

            // Извлекаем данные из XML
            const id = xmlDoc.getElementsByTagName('id')[0].textContent;
            const name = xmlDoc.getElementsByTagName('name')[0].textContent;
            const coordinatesX = xmlDoc.getElementsByTagName('x')[0].textContent;
            const coordinatesY = xmlDoc.getElementsByTagName('y')[0].textContent;
            const creationDate = xmlDoc.getElementsByTagName('creationDate')[0].textContent;
            const minimalPoint = xmlDoc.getElementsByTagName('minimalPoint')[0].textContent;
            const description = xmlDoc.getElementsByTagName('description')[0].textContent;
            const tunedInWorks = xmlDoc.getElementsByTagName('tunedInWorks')[0].textContent;
            const difficulty = xmlDoc.getElementsByTagName('difficulty')[0].textContent;
            const disciplineName = xmlDoc.getElementsByTagName('discipline')[0].getElementsByTagName('name')[0].textContent;
            const labsCount = xmlDoc.getElementsByTagName('discipline')[0].getElementsByTagName('labsCount')[0].textContent;

            const labWork = {
                id,
                name,
                coordinates: { x: coordinatesX, y: coordinatesY },
                creationDate,
                minimalPoint,
                description,
                tunedInWorks,
                difficulty,
                discipline: { name: disciplineName, labsCount },
            };

            setMaxTunedInLabWork(labWork);
            setError(null);
        } catch (error) {
            setError(error.message);
            setMaxTunedInLabWork(null);
        }
    };

    return (
        <div>
            <h2>Лабораторная работа с максимальным значением tunedInWorks</h2>
            <button onClick={getMaxTunedInLabWork}>Получить</button>
            {error && (
                <div style={{ color: 'red' }}>
                    <h3>Ошибка: {error}</h3>
                </div>
            )}

            {maxTunedInLabWork && (
                <div>
                    <Table labWorkData={maxTunedInLabWork} />
                </div>
            )}
        </div>
    );
};

export default GetMaxTunedInLabWork;
