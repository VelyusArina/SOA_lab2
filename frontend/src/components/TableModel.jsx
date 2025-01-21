import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { js2xml } from 'xml-js';
import Filter from './Filter';
import Sort from './Sort';
import Pagination from './Pagination';
import config from '../components/config';
import '../style/Table.css';

const TableModel = () => {
    const [data, setData] = useState([]);
    const [sortColumn, setSortColumn] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedColumn, setSelectedColumn] = useState('id');
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/labworks`, {
                    headers: { 'Content-Type': 'application/xml' }
                });
                setData(response.data.LabWorks || []);
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 400) {
                        setError('Неверный запрос (400)');
                    } else if (err.response.status === 422) {
                        setError('Невалидные данные (422)');
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
        fetchData();
    }, []);

    const filteredData = filter
        ? data.filter(item =>
            String(item[selectedColumn]).toLowerCase().includes(filter.toLowerCase())
        )
        : data;

    const sortedData = filteredData.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedData.length / size);
    const paginatedData = sortedData.slice((page - 1) * size, page * size);

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const handleSizeChange = (e) => {
        const newSize = Number(e.target.value);
        if (newSize > 0 && Number.isInteger(newSize)) {
            setSize(newSize);
            setPage(1);
        }
    };

    return (
        <div>
            <h2>Получить элементы LabWork</h2>
            <Filter
                selectedColumn={selectedColumn}
                filter={filter}
                setFilter={setFilter}
                setSelectedColumn={setSelectedColumn}
            />
            <div>
                <label>Количество элементов на странице: </label>
                <input
                    type="number"
                    min="1"
                    value={size}
                    onChange={handleSizeChange}
                    style={{ width: '50px' }}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <Sort
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                />
                <tbody>
                {paginatedData.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.coordinates}</td>
                        <td>{item.data}</td>
                        <td>{item.minimalPoint}</td>
                        <td>{item.description}</td>
                        <td>{item.tunedInWorks ? 'Yes' : 'No'}</td>
                        <td>{item.difficulty}</td>
                        <td>{item.discipline}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                page={page}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                handlePageClick={handlePageClick}
            />
        </div>
    );
};

export default TableModel;
