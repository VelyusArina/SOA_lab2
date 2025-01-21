import React, { useState } from 'react';
import axios from 'axios';
import { js2xml, xml2js } from 'xml-js';
import config from '../config';

const UpdateLabWork = () => {
    const [labWorkId, setLabWorkId] = useState('');
    const [labWorkData, setLabWorkData] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: '',
        description: '',
        difficulty: '',
        discipline: '',
        coordinates: '',
        tunedInWorks: false,
        labsCount: 0,
        creationDate: '',
        minimalPoint: 0,
    });
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleUpdateChange = (e) => {
        setUpdatedData({
            ...updatedData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (e) => {
        setUpdatedData({
            ...updatedData,
            tunedInWorks: e.target.checked,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!labWorkId) {
            setFormError('Пожалуйста, введите ID лабораторной работы');
            return;
        }

        setFormError('');

        try {
            const response = await axios.get(`${config.API_BASE_URL}/labworks/${labWorkId}`, {
                headers: { 'Content-Type': 'application/xml' },
            });

            // Парсим XML в объект с помощью xml2js
            xml2js.parseString(response.data, (err, result) => {
                if (err) {
                    setError('Ошибка при парсинге XML');
                } else {
                    const labWork = result.LabWork;
                    setLabWorkData(labWork);
                    setUpdatedData({
                        name: labWork.name[0],
                        description: labWork.description[0],
                        difficulty: labWork.difficulty[0],
                        discipline: labWork.discipline[0].name[0],
                        coordinates: `${labWork.coordinates[0].x[0]}, ${labWork.coordinates[0].y[0]}`,
                        tunedInWorks: labWork.tunedInWorks[0] === '1',
                        labsCount: labWork.discipline[0].labsCount[0],
                        creationDate: labWork.creationDate[0],
                        minimalPoint: labWork.minimalPoint[0],
                    });
                    setError(null);
                }
            });
        } catch (err) {
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
            } else {
                setError('Ошибка при подключении к серверу');
            }
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        // Преобразуем обновленные данные в XML
        const xmlData = js2xml(
            { LabWork: updatedData }, // Корневой элемент
            { compact: true, ignoreComment: true, spaces: 4 }
        );

        try {
            const response = await axios.put(`${config.API_BASE_URL}/labworks/${labWorkId}`, xmlData, {
                headers: { 'Content-Type': 'application/xml' },
            });

            console.log('Лабораторная работа обновлена:', response.data);
            setError(null);
        } catch (err) {
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
            } else {
                setError('Ошибка при подключении к серверу');
            }
        }
    };

    return (
        <div>
            <h2>Обновить лабораторную работу</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="labWorkId">Введите ID лабораторной работы: </label>
                <input
                    type="text"
                    id="labWorkId"
                    placeholder="Введите ID"
                    value={labWorkId}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Найти лабораторную работу</button>
            </form>

            {formError && <p style={{ color: 'red' }}>{formError}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {labWorkData && (
                <div>
                    <h3>Редактировать лабораторную работу</h3>
                    <form onSubmit={handleUpdateSubmit}>
                        <div>
                            <label htmlFor="name">Название:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={updatedData.name}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Описание:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={updatedData.description}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="difficulty">Сложность:</label>
                            <select
                                name="difficulty"
                                id="difficulty"
                                value={updatedData.difficulty}
                                onChange={handleUpdateChange}
                                required
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                                <option value="VERY_HARD">VERY HARD</option>
                                <option value="IMPOSSIBLE">IMPOSSIBLE</option>
                                <option value="TERRIBLE">TERRIBLE</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="discipline">Дисциплина:</label>
                            <input
                                type="text"
                                id="discipline"
                                name="discipline"
                                value={updatedData.discipline}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="coordinates">Координаты:</label>
                            <input
                                type="text"
                                id="coordinates"
                                name="coordinates"
                                value={updatedData.coordinates}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="tunedInWorks">Включена в работы:</label>
                            <input
                                type="checkbox"
                                id="tunedInWorks"
                                name="tunedInWorks"
                                checked={updatedData.tunedInWorks}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="labsCount">Количество лабораторных работ в дисциплине:</label>
                            <input
                                type="number"
                                id="labsCount"
                                name="labsCount"
                                value={updatedData.labsCount}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="creationDate">Дата создания:</label>
                            <input
                                type="datetime-local"
                                id="creationDate"
                                name="creationDate"
                                value={updatedData.creationDate}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="minimalPoint">Минимальная оценка:</label>
                            <input
                                type="number"
                                id="minimalPoint"
                                name="minimalPoint"
                                value={updatedData.minimalPoint}
                                onChange={handleUpdateChange}
                                required
                            />
                        </div>
                        <button type="submit">Обновить</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateLabWork;
