import React, { Component } from 'react';
import DecreaseLabWorkDifficulty from "../components/DecreaseLabWorkDifficulty";
import '../style/Button.css';

class SecondPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isServiceAvailable: true, // Флаг, указывающий на доступность сервиса
            errorMessage: '' // Сообщение об ошибке
        };
    }

    componentDidMount() {
        this.checkServiceAvailability();
    }

    checkServiceAvailability = () => {
        // Здесь можно выполнить запрос к API или произвести проверку доступности сервиса
        // Пример с таймаутом для имитации проверки:
        setTimeout(() => {
            const isServiceAvailable = false;
            if (!isServiceAvailable) {
                this.setState({
                    isServiceAvailable: false,
                    errorMessage: 'Сервис недоступен. Пожалуйста, попробуйте позже.'
                });
            }
        }, 1000); // Имитация задержки проверки
    };

    render() {
        const { isServiceAvailable, errorMessage } = this.state;

        if (!isServiceAvailable) {
            return (
                <div className="error-container" style={{ textAlign: 'center', color: 'red' }}>
                    <h2>{errorMessage}</h2>
                </div>
            );
        }

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
