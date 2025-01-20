import React, { useState } from 'react';
import '../style/AddLabWork.css'; // Подключаем файл с CSS

const AddLabWork = ({ onAdd }) => {
    const [newLabWork, setNewLabWork] = useState({
        name: '',
        coordinates: '',
        data: '',
        minimalPoint: '',
        description: '',
        tunedInWorks: false,
        difficulty: '',
        discipline: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // Для управления открытием/закрытием модального окна

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLabWork({
            ...newLabWork,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const addedLabWork = { ...newLabWork, id: Date.now() }; // Используем временный id
        onAdd(addedLabWork); // Добавляем лабораторную работу в родительский компонент
        setNewLabWork({
            name: '',
            coordinates: '',
            data: '',
            minimalPoint: '',
            description: '',
            tunedInWorks: false,
            difficulty: '',
            discipline: ''
        });
        setIsModalOpen(false); // Закрыть модальное окно после отправки формы
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className="open-modal-btn">Добавить новую лабораторную работу</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button onClick={() => setIsModalOpen(false)} className="close-modal-btn">X</button>
                        <h2 className="form-title">Добавить новую лабораторную работу</h2>
                        <form className="labwork-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Название:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newLabWork.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Введите название лабораторной работы"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="coordinates">Координаты:</label>
                                <input
                                    type="number"
                                    name="coordinates"
                                    value={newLabWork.coordinates}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Введите координаты работы"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="data">Дата:</label>
                                <input
                                    type="date"
                                    name="data"
                                    value={newLabWork.data}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Выберите дату"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="minimalPoint">Минимальная точка:</label>
                                <input
                                    type="number"
                                    name="minimalPoint"
                                    value={newLabWork.minimalPoint}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Введите минимальную точку"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Описание:</label>
                                <textarea
                                    name="description"
                                    value={newLabWork.description}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Введите описание лабораторной работы"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tunedInWorks">Тюнингованная работа:</label>
                                <input
                                    type="checkbox"
                                    name="tunedInWorks"
                                    checked={newLabWork.tunedInWorks}
                                    onChange={(e) => setNewLabWork({
                                        ...newLabWork,
                                        tunedInWorks: e.target.checked
                                    })}
                                    className="form-checkbox"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="difficulty">Сложность:</label>
                                <select
                                    name="difficulty"
                                    value={newLabWork.difficulty}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                >
                                    <option value="">Выберите сложность</option>
                                    <option value="NORMAL">NORMAL</option>
                                    <option value="HARD">HARD</option>
                                    <option value="VERY_HARD">VERY_HARD</option>
                                    <option value="IMPOSSIBLE">IMPOSSIBLE</option>
                                    <option value="TERRIBLE">TERRIBLE</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="discipline">Дисциплина:</label>
                                <input
                                    type="text"
                                    name="discipline"
                                    value={newLabWork.discipline}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Введите дисциплину"
                                />
                            </div>
                            <button type="submit" className="submit-btn">Добавить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddLabWork;
