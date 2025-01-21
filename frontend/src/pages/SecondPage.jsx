import React, { Component } from 'react';
import axios from 'axios';
import DecreaseLabWorkDifficulty from "../components/DecreaseLabWorkDifficulty";
import '../style/Button.css';
import RemoveLabWorkFromDiscipline from "../components/RemoveLabWorkFromDiscipline";

class SecondPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isServiceAvailable: true, // Флаг, доступность текущего сервиса
            isFirstServerAvailable: true, // Флаг, доступность первого сервера
            errorMessage: '',
        };
    }

    componentDidMount() {
        this.checkServersAvailability();
    }

    checkServersAvailability = async () => {
        try {
            await axios.get('/health');
            this.setState({ isFirstServerAvailable: true });

            // Если первый сервер доступен, проверяем доступность второго сервера
            await axios.get('/current-server-health');
            this.setState({ isServiceAvailable: true });
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Если первый сервер недоступен
                this.setState({
                    isFirstServerAvailable: false,
                    isServiceAvailable: false,
                    errorMessage: 'Первый сервер недоступен, второй сервер также недоступен.'
                });
            } else {
                // Если второй сервер недоступен
                this.setState({
                    isFirstServerAvailable: true,
                    isServiceAvailable: false,
                    errorMessage: 'Текущий сервер недоступен. Пожалуйста, попробуйте позже.'
                });
            }
        }
    };

    render() {
        const { isServiceAvailable, isFirstServerAvailable, errorMessage } = this.state;

        // Если первый сервер недоступен, то второй сервер тоже недоступен
        if (!isFirstServerAvailable || !isServiceAvailable) {
            return (
                <div className="error-container" style={{ textAlign: 'center', color: 'red' }}>
                    <h2>{errorMessage || 'Сервисы недоступны. Пожалуйста, попробуйте позже.'}</h2>
                </div>
            );
        }

        return (
            <div className="main-container">
                <div className="section">
                    <div className="section-content">
                        <DecreaseLabWorkDifficulty />
                        <RemoveLabWorkFromDiscipline />
                    </div>
                </div>
            </div>
        );
    }
}

export default SecondPage;
