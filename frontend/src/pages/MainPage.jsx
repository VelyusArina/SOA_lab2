import React from 'react';
import axios from 'axios';
import TableModel from "../components/TableModel";
import AddLabWork from "../components/AddLabWork";
import LabWorkById from "../components/LabWorkById";
import UpdateLabWork from "../components/UpdateLabWork";
import DeleteLabWork from "../components/DeleteLabWork";
import GetMaxTunedInLabWork from "../components/GetMaxTunedInLabWork";
import GetLabWorksLessThanMinimal from "../components/GetLabWorksLessThanMinimal";
import '../style/Button.css';
import GroupLabWorksByDescription from "../components/GroupLabWorksByDescription";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCRUDOpen: true,
            isDOPOpen: true,
            serverStatus: null
        };
    }

    componentDidMount() {
        this.checkServerStatus();
    }

    checkServerStatus = async () => {
        try {
            const response = await axios.get('/health');
            if (response.status === 200) {
                this.setState({ serverStatus: 'Сервер запущен' });
            }
        } catch (error) {
            this.setState({ serverStatus: 'Сервер недоступен' });
        }
    };

    toggleCRUD = () => {
        this.setState(prevState => ({ isCRUDOpen: !prevState.isCRUDOpen }));
    };

    toggleDOP = () => {
        this.setState(prevState => ({ isDOPOpen: !prevState.isDOPOpen }));
    };

    render() {
        const { isCRUDOpen, isDOPOpen, serverStatus } = this.state;

        return (
            <div className="main-container">
                <div className="server-status">
                    {serverStatus ? (
                        <p>{serverStatus}</p>
                    ) : (
                        <p>Проверка состояния сервера...</p>
                    )}
                </div>

                {/* CRUD Section */}
                <div className="section">
                    <div onClick={this.toggleCRUD} className="section-header">
                        <h1>CRUD</h1>
                        <i className={`fas ${isCRUDOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} />
                    </div>
                    {isCRUDOpen && (
                        <div className="section-content">
                            <TableModel />
                            <LabWorkById />
                            <AddLabWork onAdd={this.handleAddLabWork} />
                            <UpdateLabWork />
                            <DeleteLabWork />
                        </div>
                    )}
                </div>

                {/* DOP Section */}
                <div className="section">
                    <div onClick={this.toggleDOP} className="section-header">
                        <h1>DOP</h1>
                        <i className={`fas ${isDOPOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} />
                    </div>
                    {isDOPOpen && (
                        <div className="section-content">
                            <GetMaxTunedInLabWork />
                            <GroupLabWorksByDescription />
                            <GetLabWorksLessThanMinimal />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MainPage;
