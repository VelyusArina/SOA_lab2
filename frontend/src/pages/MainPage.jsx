import React from 'react';
import Table from "../components/Table";
import AddLabWork from "../components/AddLabWork";


class MainPage extends React.Component{
    render() {
        return (
            <div>
                <div>
                    <h1>CRUD</h1>
                    <h2>Получить массив элементов LabWork</h2>
                    <Table></Table>
                    <h2>Получить лабораторную работу по ID</h2>

                    <h2>Добавить новую лабораторную работу</h2>
                    <AddLabWork onAdd={this.handleAddLabWork} />

                    <h2>Обновить лабораторную работу</h2>

                    <h2>Удалить лабораторную работу по ID</h2>

                </div>

                <div>
                    <h1>DOP</h1>
                    <h2>Вернуть объект с максимальным значением tunedInWorks</h2>

                    <h2>Вернуть количество объектов, где значение minimal меньше заданного</h2>

                </div>
            </div>
        );
    }
}

export default MainPage;
