import React from 'react';

const Filter = ({ selectedColumn, filter, setFilter, setSelectedColumn }) => {
    return (
        <div>
            {/* Выбор столбца для фильтрации */}
            <div>
                <label>Select Column to Filter: </label>
                <select
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                >
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                    <option value="coordinates">Coordinates</option>
                    <option value="data">Data</option>
                    <option value="minimalPoint">Minimal Point</option>
                    <option value="description">Description</option>
                    <option value="tunedInWorks">Tuned in Works</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="discipline">Discipline</option>
                </select>
            </div>

            {/* Поле ввода для фильтрации */}
            <div>
                <label>Фильтр {selectedColumn}: </label>
                <input
                    type="text"
                    placeholder={`Фильтр ${selectedColumn}`}
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                />
            </div>
        </div>
    );
};

export default Filter;
