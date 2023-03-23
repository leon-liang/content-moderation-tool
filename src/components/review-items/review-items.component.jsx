import React from 'react';

import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import ReviewItemsPriorityLabel from "../review-items-priority-label/review-items-priority-label.component";

import './review-items.styles.scss';
class ReviewItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRow: 0,
            filterByViolationType: "All",
            sortByAssessedRisk: "Descending",
            reviewItems : [
                {
                    priority: 7,
                    assessedRisk: 0.93,
                    playerName: "Max Musterman",
                    amountOfTimesReported: 3,
                    suggestedAction: "Dangerous Speech",
                    gameId: "Clash of Clans",
                    preview: "Mother fuckers banned me, so it's gonna be a no go there.",
                    date: "10-02-2023",
                    violationType: [
                        "Vulgarity"
                    ]
                },
                {
                    priority: 2,
                    assessedRisk: 0.21,
                    playerName: "Max Musterman",
                    amountOfTimesReported: 1,
                    suggestedAction: "Hate",
                    gameId: "Clash of Clans",
                    preview: "Do you just try to hog cycle me huh?",
                    date: "10-02-2023",
                    violationType: [
                        "Public Threat"
                    ]

                },
                {
                    priority: 5,
                    assessedRisk: 0.43,
                    playerName: "Max Musterman",
                    amountOfTimesReported: 7,
                    suggestedAction: "Aggravation",
                    gameId: "Clash of Clans",
                    preview: "Mother fuckers banned me, so it's gonna be a no go there.",
                    date: "10-02-2023",
                    violationType: [
                        "Vulgarity"
                    ]
                }
            ]
        }
    }

    setSuggestedAction(index, action) {
        let reviewItems = [...this.state.reviewItems];
        let item = {...reviewItems[index]};
        item.suggestedAction = action;
        reviewItems[index] = item;
        this.setState({reviewItems}, () => {
            console.log(this.state.reviewItems[index].suggestedAction)
        });
    }
    setSelectedRow(index) {
        this.setState({selectedRow: index})
    }

    setFilterByViolationType(type) {
        this.setState({filterByViolationType: type})
    }

    setSortByAssessedRisk(order) {
        this.setState({sortByAssessedRisk: order})
    }
    render() {
        let reviewItems = this.state.reviewItems;
        if (this.state.filterByViolationType !== "All") {
            reviewItems = reviewItems.filter((item) => {
                return item.violationType.includes(this.state.filterByViolationType);
            });
        }

        reviewItems = reviewItems.sort((a, b) => {
            let sorted;
            if (this.state.sortByAssessedRisk === "Ascending") {
                sorted = a.assessedRisk - b.assessedRisk;
            } else {
                sorted = b.assessedRisk - a.assessedRisk;
            }
            return sorted;
        });

        reviewItems = reviewItems.map((item, index) => {
            return (
                <tr style={this.state.selectedRow === index ? {backgroundColor: "rgb(236, 236, 236)"} : {}} onClick={() => this.setSelectedRow(index)} key={index}>
                    <td>
                        <ReviewItemsPriorityLabel priority={item.priority}/>
                    </td>
                    <td>{item.assessedRisk}</td>
                    <td>{item.preview}</td>
                    <td>{item.date}</td>
                    <td>{item.violationType.join(", ")}</td>
                </tr>
            )
        });


        return (
            <div className='review-items-container'>
                <div className="review-items-table overflow-auto">
                    <div style={{"display": "block"}} style={{"marginBottom": "1rem"}}>
                        <p style={{"display": "inline-block", "paddingRight": "0.5rem"}}>Violation Type: </p>
                        <DropdownButton style={{"display": "inline-block", "paddingRight": "1rem"}} size="sm" variant="secondary" id="" title={this.state.filterByViolationType}>
                            <Dropdown.Item onClick={() => this.setFilterByViolationType("All")}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setFilterByViolationType("Bullying")}>Bullying</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setFilterByViolationType("Sexual Content")}>Sexual Content</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setFilterByViolationType("Vulgarity")}>Vulgarity</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setFilterByViolationType("Drugs / Alcohol")}>Drugs / Alcohol</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setFilterByViolationType("Fraud")}>Fraud</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setFilterByViolationType("Public Threat")}>Public Threat</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setFilterByViolationType("Extremism")}>Extremism</Dropdown.Item>
                        </DropdownButton>

                        <p style={{"display": "inline-block", "paddingRight": "0.5rem"}}>Assessed Risk: </p>
                        <DropdownButton style={{"display": "inline-block"}} size="sm" variant="secondary" id="" title={this.state.sortByAssessedRisk}>
                            <Dropdown.Item onClick={() => this.setSortByAssessedRisk("Ascending")}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSortByAssessedRisk("Descending")}>Descending</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>Priority</th>
                            <th>Assessed Risk</th>
                            <th>Preview</th>
                            <th>Date</th>
                            <th>Violation Type</th>
                        </tr>
                        </thead>
                        <tbody>
                            {reviewItems}
                        </tbody>
                    </Table>
                </div>
                <div className='review-items-details overflow-auto'>
                    <h4 style={{"marginBottom": "1.5rem"}}>Details</h4>
                    <p style={{"display": "inline-block", "paddingRight": "1rem"}}>{this.state.reviewItems[this.state.selectedRow].date}</p>
                    <ReviewItemsPriorityLabel style={{"display": "inline-block"}} priority={this.state.reviewItems[this.state.selectedRow].priority}/>

                    <p><strong>Player concerned: </strong>{this.state.reviewItems[this.state.selectedRow].playerName}'s Account</p>
                    <p><strong>Reported by: </strong></p>
                    <p><strong>For review: </strong>{this.state.reviewItems[this.state.selectedRow].preview}</p>
                    <p><strong>Violation type: </strong> {this.state.reviewItems[this.state.selectedRow].violationType.join(", ")}</p>

                    <Accordion alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>General Information</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Chat Context</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Information on the Player</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Information on the Alliance</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Cultural Context</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <Dropdown style={{"marginTop": "1rem", "display": "inline-block", "marginRight": "0.5rem"}}>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            {this.state.reviewItems[this.state.selectedRow].suggestedAction}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Spamming / Scamming")}>Spamming / Scamming</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Political Identity")}>Political Identity</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Unintended")}>Unintended</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Pll")}>Pll</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Aggravation")}>Aggravation</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Habuku")}>Habuku</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Abuse of Play")}>Abuse of Play</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Harassment")}>Harassment</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Hate")}>Hate</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Inappropriate sharing")}>Inappropriate sharing</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Dangerous Speech")}>Dangerous Speech</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Extremism")}>Extremism</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Criminal or Predatory")}>Criminal or Predatory</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => this.setSuggestedAction(this.state.selectedRow, "Ignore")}>Ignore</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button style={{"display": "inline-block"}} variant="dark">Submit</Button>
                </div>
            </div>
        )
    }
}

export default ReviewItems;
