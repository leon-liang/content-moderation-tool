import React from 'react';
import './dashboard-page.styles.scss';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ReviewItems from "../components/review-items/review-items.component";

class DashboardPage extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className='dashboard-container'>
                <h1 className='dashboard-title'>Dashboard</h1>
                <Tabs
                    defaultActiveKey="all-entities"
                    id="dashboard-options"
                    className="mb-3"
                >
                    <Tab eventKey="all-entities" title="All Entities">
                        <ReviewItems />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default DashboardPage;