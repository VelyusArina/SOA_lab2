
export const Table = ({ labWorkData }) => (
    <div>
        <table>
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
                <td>{labWorkData.coordinates}</td>
                <td>{labWorkData.data}</td>
                <td>{labWorkData.minimalPoint}</td>
                <td>{labWorkData.description}</td>
                <td>{labWorkData.tunedInWorks}</td>
                <td>{labWorkData.difficulty}</td>
                <td>{labWorkData.discipline}</td>
            </tr>
            </tbody>
        </table>
    </div>
);
