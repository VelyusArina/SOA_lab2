import React, { useState } from 'react';
import config from '../components/config';

const GroupLabWorksByDescription = () => {
    const [groupedData, setGroupedData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const getLabWorksGroupedByDescription = async () => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/labworks/group-by-description`, {
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

            const labWorks = xmlDoc.getElementsByTagName('LabWork');
            const descriptionGroups = {};

            Array.from(labWorks).forEach((labWork) => {
                const description = labWork.getElementsByTagName('description')[0].textContent;

                if (!descriptionGroups[description]) {
                    descriptionGroups[description] = 0;
                }

                descriptionGroups[description] += 1;
            });

            const groupedArray = Object.keys(descriptionGroups).map((description) => ({
                description,
                count: descriptionGroups[description],
            }));

            setGroupedData(groupedArray);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            setGroupedData([]);
        }
    };

    return (
        <div>
            <h2>Сгруппировать объекты по полю description и вернуть количество элементов в каждой группє</h2>
            <button onClick={getLabWorksGroupedByDescription}>Получить сгруппированные данные</button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {groupedData.length > 0 && (
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupedData.map((group, index) => (
                            <tr key={index}>
                                <td>{group.description}</td>
                                <td>{group.count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GroupLabWorksByDescription;
