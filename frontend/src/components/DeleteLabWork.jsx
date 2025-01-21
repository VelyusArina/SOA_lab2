import React, { useState } from 'react';
import axios from 'axios';
import config from '../components/config';

const DeleteLabWork = () => {
    const [labWorkId, setLabWorkId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        setLabWorkId(e.target.value);
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!labWorkId) {
            setFormError('Пожалуйста, введите ID лабораторной работы');
            return;
        }

        setFormError('');

        // Создание строки XML вручную
        const xmlData = `<LabWork><id>${labWorkId}</id></LabWork>`;

        try {
            const response = await axios.delete(`${config.API_BASE_URL}/labworks/${labWorkId}`, {
                headers: { 'Content-Type': 'application/xml' },
            });

            if (response.status === 200) {
                setError(null);
                setSuccess('Лабораторная работа успешно удалена');
            }
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
                setSuccess(null);
            } else if (err.request) {
                setError('Ошибка при отправке запроса');
                setSuccess(null);
            } else {
                setError('Неизвестная ошибка');
                setSuccess(null);
            }
        }
    };

    return (
        <div>
            <h2>Удалить лабораторную работу по ID</h2>
            <form onSubmit={handleDelete}>
                <label htmlFor="labWorkId">Введите ID лабораторной работы для удаления: </label>
                <input
                    type="text"
                    id="labWorkId"
                    placeholder={`Введите ID`}
                    value={labWorkId}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Удалить лабораторную работу</button>
            </form>

            {formError && <p style={{ color: 'red' }}>{formError}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default DeleteLabWork;
