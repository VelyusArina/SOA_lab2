import React, { useState } from 'react';
import Filter from './Filter';
import Sort from './Sort';
import Pagination from './Pagination';
import '../style/Table.css';

const TableModel = () => {
    const data = [
        { id: 1, name: 'Item 1', coordinates: 20, data: '2024-01-01', minimalPoint: 5, description: 'Description 1', tunedInWorks: true, difficulty: 'Easy', discipline: 'Math' },
        { id: 2, name: 'Item 2', coordinates: 30, data: '2024-01-02', minimalPoint: 10, description: 'Description 2', tunedInWorks: false, difficulty: 'Medium', discipline: 'Science' },
        { id: 3, name: 'Item 3', coordinates: 25, data: '2024-01-03', minimalPoint: 7, description: 'Description 3', tunedInWorks: true, difficulty: 'Hard', discipline: 'History' },
        { id: 4, name: 'Item 4', coordinates: 40, data: '2024-01-04', minimalPoint: 12, description: 'Description 4', tunedInWorks: true, difficulty: 'Easy', discipline: 'Literature' },
        { id: 5, name: 'Item 5', coordinates: 15, data: '2024-01-05', minimalPoint: 3, description: 'Description 5', tunedInWorks: false, difficulty: 'Hard', discipline: 'Math' },
        { id: 6, name: 'Item 6', coordinates: 22, data: '2024-01-06', minimalPoint: 9, description: 'Description 6', tunedInWorks: true, difficulty: 'Medium', discipline: 'Science' },
    ];

    const [sortColumn, setSortColumn] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedColumn, setSelectedColumn] = useState('id');
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);

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
            setPage(1); // сбрасываем на первую страницу при изменении размера
        }
    };

    return (
        <div>
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
