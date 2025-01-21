import React, { useState } from 'react';
import config from '../components/config';

const DecreaseLabWorkDifficulty = () => {
    const [labWorkId, setLabWorkId] = useState('');
    const [steps, setSteps] = useState(1);
    const [updatedLabWork, setUpdatedLabWork] = useState(null);
    const [error, setError] = useState('');
    const [formError, setFormError] = useState('');

    const handleLabWorkIdChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleStepsChange = (e) => {
        setSteps(Number(e.target.value));
    };

    const handleDecreaseDifficulty = async () => {
        if (!labWorkId || !steps) {
            setFormError('Пожалуйста, заполните оба поля');
            return;
        }
        setFormError('');

        try {
            const response = await fetch(`${config.API_BASE_URL_SECOND}/bars/labwork/${labWorkId}/difficulty/decrease/${steps}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/xml',
                    'Content-Type': 'application/xml',
                },
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Неверный запрос (400)');
                } else if (response.status === 404) {
                    throw new Error('Лабораторная работа не найдена (404)');
                } else if (response.status === 409) {
                    throw new Error('Конфликт с данным состоянием (409)');
                } else if (response.status === 500) {
                    throw new Error('Ошибка сервера (500)');
                } else {
                    throw new Error('Неизвестная ошибка');
                }
            }

            const xmlData = await response.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

            const labWork = xmlDoc.getElementsByTagName('LabWork')[0];
            const updated = {
                id: labWork.getElementsByTagName('id')[0].textContent,
                name: labWork.getElementsByTagName('name')[0].textContent,
                difficulty: labWork.getElementsByTagName('difficulty')[0].textContent,
                description: labWork.getElementsByTagName('description')[0].textContent,
                discipline: labWork.getElementsByTagName('discipline')[0].textContent,
                coordinates: labWork.getElementsByTagName('coordinates')[0].textContent,
                creationDate: labWork.getElementsByTagName('creationDate')[0].textContent,
                minimalPoint: labWork.getElementsByTagName('minimalPoint')[0].textContent,
                tunedInWorks: labWork.getElementsByTagName('tunedInWorks')[0].textContent,
                labsCount: labWork.getElementsByTagName('labsCount')[0].textContent,
            };

            setUpdatedLabWork(updated);
            setError('');
        } catch (error) {
            setUpdatedLabWork(null);
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Понизить сложность заданной лабораторной работы на указанное число шагов</h2>

            {/* Ввод ID лабораторной работы */}
            <div>
                <label htmlFor="labWorkId">Введите ID лабораторной работы: </label>
                <input
                    type="text"
                    id="labWorkId"
                    placeholder={`Введите ID`}
                    value={labWorkId}
                    onChange={handleLabWorkIdChange}
                    required
                />
            </div>

            {/* Ввод числа шагов для понижения сложности */}
            <div>
                <label htmlFor="steps">Шаги понижения сложности: </label>
                <input
                    type="number"
                    id="steps"
                    value={steps}
                    onChange={handleStepsChange}
                    min="1"
                    required
                />
            </div>

            {formError && <p style={{ color: 'red' }}>{formError}</p>}

            <button onClick={handleDecreaseDifficulty}>Понизить сложность</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {updatedLabWork && (
                <div>
                    <h3>Обновленная лабораторная работа</h3>
                    <p>ID: {updatedLabWork.id}</p>
                    <p>Название: {updatedLabWork.name}</p>
                    <p>Новая сложность: {updatedLabWork.difficulty}</p>
                    <p>Описание: {updatedLabWork.description}</p>
                    <p>Дисциплина: {updatedLabWork.discipline}</p>
                    <p>Координаты: {updatedLabWork.coordinates}</p>
                    <p>Дата создания: {updatedLabWork.creationDate}</p>
                    <p>Минимальная точка: {updatedLabWork.minimalPoint}</p>
                    <p>Количество подключенных работ: {updatedLabWork.tunedInWorks}</p>
                    <p>Количество лабораторных работ в дисциплине: {updatedLabWork.labsCount}</p>
                </div>
            )}
        </div>
    );
};

export default DecreaseLabWorkDifficulty;
