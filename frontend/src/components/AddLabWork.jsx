import React, { useState } from 'react';
import axios from 'axios';
import { js2xml } from 'xml-js';
import config from '../config';

const AddLabWork = ({ onAdd }) => {
    const [newLabWork, setNewLabWork] = useState({
        name: '',
        coordinates: { x: '', y: '' },
        creationDate: '',
        minimalPoint: '',
        description: '',
        tunedInWorks: false,
        difficulty: '',
        discipline: { name: '', labsCount: '' }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "x" || name === "y") {
            setNewLabWork({
                ...newLabWork,
                coordinates: {
                    ...newLabWork.coordinates,
                    [name]: value
                }
            });
        } else if (name === "disciplineName" || name === "labsCount") {
            setNewLabWork({
                ...newLabWork,
                discipline: {
                    ...newLabWork.discipline,
                    [name === "disciplineName" ? "name" : "labsCount"]: value
                }
            });
        } else {
            setNewLabWork({
                ...newLabWork,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const xmlData = js2xml(
            { LabWork: {
                    ...newLabWork,
                    coordinates: { x: newLabWork.coordinates.x, y: newLabWork.coordinates.y },
                    discipline: { name: newLabWork.discipline.name, labsCount: newLabWork.discipline.labsCount },
                    creationDate: newLabWork.creationDate,
                }},
            { compact: true, ignoreComment: true, spaces: 4 }
        );

        try {
            const response = await axios.post(`${config.API_BASE_URL}/labworks`, xmlData, {
                headers: { 'Content-Type': 'application/xml' },
            });
            console.log('Добавлена лабораторная работа:', response.data);
            onAdd(response.data);

            setNewLabWork({
                name: '',
                coordinates: { x: '', y: '' },
                creationDate: '',
                minimalPoint: '',
                description: '',
                tunedInWorks: false,
                difficulty: '',
                discipline: { name: '', labsCount: '' }
            });
            setIsModalOpen(false);
            setError(null);
        } catch (err) {
            if (err.response) {
                // Ошибка на стороне сервера, доступ к response
                if (err.response.status === 400) {
                    setError('Неверный запрос (400)');
                } else if (err.response.status === 409) {
                    setError('Конфликт (409) — такая лабораторная работа уже существует');
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
            <h2>Добавить новую лабораторную работу</h2>
            <button onClick={() => setIsModalOpen(true)} className="open-modal-btn">Добавить новую лабораторную работу</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button onClick={() => setIsModalOpen(false)} className="close-modal-btn">X</button>
                        <h2>Добавить новую лабораторную работу</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Название"
                                value={newLabWork.name}
                                onChange={handleChange}
                                required
                            />
                            <div>
                                <input
                                    type="number"
                                    name="x"
                                    placeholder="Координата X"
                                    value={newLabWork.coordinates.x}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="y"
                                    placeholder="Координата Y"
                                    value={newLabWork.coordinates.y}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <input
                                type="datetime-local"
                                name="creationDate"
                                value={newLabWork.creationDate}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="minimalPoint"
                                placeholder="Минимальная точка"
                                value={newLabWork.minimalPoint}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Описание"
                                value={newLabWork.description}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="checkbox"
                                name="tunedInWorks"
                                checked={newLabWork.tunedInWorks}
                                onChange={(e) =>
                                    setNewLabWork({ ...newLabWork, tunedInWorks: e.target.checked })
                                }
                            />
                            <select
                                name="difficulty"
                                value={newLabWork.difficulty}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Сложность</option>
                                <option value="NORMAL">NORMAL</option>
                                <option value="HARD">HARD</option>
                                <option value="VERY_HARD">VERY_HARD</option>
                            </select>
                            <input
                                type="text"
                                name="disciplineName"
                                placeholder="Название дисциплины"
                                value={newLabWork.discipline.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="labsCount"
                                placeholder="Количество лабораторных работ"
                                value={newLabWork.discipline.labsCount}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Добавить</button>
                        </form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddLabWork;
