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
            <div className="main-container">
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
                            <GetLabWorksLessThanMinimal />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MainPage;
