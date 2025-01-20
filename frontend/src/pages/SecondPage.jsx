import React from 'react';
import DecreaseLabWorkDifficulty from "../components/DecreaseLabWorkDifficulty";
import '../style/Button.css';

class SecondPage extends React.Component {
    render() {
        return (
            <div className="main-container">
                {/* Раздел с компонентом DecreaseLabWorkDifficulty */}
                <div className="section">
                    <div className="section-content">
                        <DecreaseLabWorkDifficulty />
                    </div>
                </div>

                {/* Раздел для удаления лабораторной работы */}
                <div className="section">
                    <div className="section-header">
                        <h2>Удалить лабораторную работу из программы дисциплины</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default SecondPage;
