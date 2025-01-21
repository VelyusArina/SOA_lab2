export const Table = ({ labWorkData }) => (
    <div>
        <table border="1">
            <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Координаты</th>
                <th>Дата</th>
                <th>Минимальная точка</th>
                <th>Описание</th>
                <th>Tuned In Works</th>
                <th>Сложность</th>
                <th>Дисциплина</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{labWorkData.id}</td>
                <td>{labWorkData.name}</td>
                <td>{`X: ${labWorkData.coordinates.x}, Y: ${labWorkData.coordinates.y}`}</td>
                <td>{labWorkData.creationDate}</td>
                <td>{labWorkData.minimalPoint}</td>
                <td>{labWorkData.description}</td>
                <td>{labWorkData.tunedInWorks}</td>
                <td>{labWorkData.difficulty}</td>
                <td>{labWorkData.discipline.name}</td>
            </tr>
            </tbody>
        </table>
    </div>
);
