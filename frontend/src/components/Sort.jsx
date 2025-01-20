import React from 'react';

const Sort = ({ sortColumn, sortDirection, handleSort }) => {
    return (
        <thead>
        <tr>
            <th onClick={() => handleSort('id')}>
                ID
                <span className={`arrow ${sortColumn === 'id' ? sortDirection : ''}`}></span>
            </th>
            <th onClick={() => handleSort('name')}>
                Name
                <span className={`arrow ${sortColumn === 'name' ? sortDirection : ''}`}></span>
            </th>
            <th onClick={() => handleSort('coordinates')}>
                Coordinates
                <span className={`arrow ${sortColumn === 'coordinates' ? sortDirection : ''}`}></span>
            </th>
            <th onClick={() => handleSort('data')}>
                Data
                <span className={`arrow ${sortColumn === 'data' ? sortDirection : ''}`}></span>
            </th>
            <th onClick={() => handleSort('minimalPoint')}>
                Minimal Point
                <span className={`arrow ${sortColumn === 'minimalPoint' ? sortDirection : ''}`}></span>
            </th>
            <th onClick={() => handleSort('description')}>
                Description
                <span className={`arrow ${sortColumn === 'description' ? sortDirection : ''}`}></span>
            </th>
            <th onClick={() => handleSort('tunedInWorks')}>
                Tuned in Works
                <span className={`arrow ${sortColumn === 'tunedInWorks' ? sortDirection : ''}`}></span>
            </th>
            <th onClick={() => handleSort('difficulty')}>
                Difficulty
                <span className={`arrow ${sortColumn === 'difficulty' ? sortDirection : ''}`}></span>
            </th>
            <th onClick={() => handleSort('discipline')}>
                Discipline
                <span className={`arrow ${sortColumn === 'discipline' ? sortDirection : ''}`}></span>
            </th>
        </tr>
        </thead>
    );
};

export default Sort;
