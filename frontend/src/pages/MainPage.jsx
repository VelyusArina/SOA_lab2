import React from 'react';
import TableModel from "../components/TableModel";
import AddLabWork from "../components/AddLabWork";
import LabWorkById from "../components/LabWorkById";
import UpdateLabWork from "../components/UpdateLabWork";
import DeleteLabWork from "../components/DeleteLabWork";
import GetMaxTunedInLabWork from "../components/GetMaxTunedInLabWork";
import GetLabWorksLessThanMinimal from "../components/GetLabWorksLessThanMinimal";
import '../style/Button.css';


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCRUDOpen: true,
            isDOPOpen: true
        };
    }

    toggleCRUD = () => {
        this.setState(prevState => ({ isCRUDOpen: !prevState.isCRUDOpen }));
    };

    toggleDOP = () => {
        this.setState(prevState => ({ isDOPOpen: !prevState.isDOPOpen }));
    };

    render() {
        const { isCRUDOpen, isDOPOpen } = this.state;

        return (
            <div>
                {/* CRUD Section */}
                <div>
                    <div onClick={this.toggleCRUD} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                        <h1>CRUD</h1>
                        <i className={`fas ${isCRUDOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}
                           style={{marginLeft: '10px'}}></i>
                    </div>
                    {isCRUDOpen && (
                        <div>
                            <h2>Получить элементы LabWork</h2>
                            <TableModel></TableModel>
                            <h2>Получить лабораторную работу по ID</h2>
                            <LabWorkById></LabWorkById>
                            <h2>Добавить новую лабораторную работу</h2>
                            <AddLabWork onAdd={this.handleAddLabWork}/>
                            <UpdateLabWork></UpdateLabWork>
                            <DeleteLabWork></DeleteLabWork>
                        </div>
                    )}
                </div>

                {/* DOP Section */}
                <div>
                    <div onClick={this.toggleDOP} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                        <h1>DOP</h1>
                        <i className={`fas ${isDOPOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}
                           style={{marginLeft: '10px'}}></i>
                    </div>
                    {isDOPOpen && (
                        <div>
                            <GetMaxTunedInLabWork></GetMaxTunedInLabWork>
                            <GetLabWorksLessThanMinimal></GetLabWorksLessThanMinimal>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MainPage;
