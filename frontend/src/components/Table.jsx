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
                <td>{labWorkData.id[0]}</td>
                <td>{labWorkData.name[0]}</td>
                <td>{`X: ${labWorkData.coordinates[0].x[0]}, Y: ${labWorkData.coordinates[0].y[0]}`}</td>
                <td>{labWorkData.creationDate[0]}</td>
                <td>{labWorkData.minimalPoint[0]}</td>
                <td>{labWorkData.description[0]}</td>
                <td>{labWorkData.tunedInWorks[0]}</td>
                <td>{labWorkData.difficulty[0]}</td>
                <td>{labWorkData.discipline[0].name[0]}</td>
            </tr>
            </tbody>
        </table>
    </div>
);
