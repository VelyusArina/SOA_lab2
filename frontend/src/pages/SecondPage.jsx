import React from 'react';
import DecreaseLabWorkDifficulty from "../components/DecreaseLabWorkDifficulty";

class SecondPage extends React.Component{
    render() {
        return (
            <div>
                <h2>Понизить сложность заданной лабораторной работы на указанное число шагов</h2>
                <DecreaseLabWorkDifficulty></DecreaseLabWorkDifficulty>
                <h2>Удалить лабораторную работу из программы дисциплины</h2>
            </div>
        );
    }
}

export default SecondPage;
