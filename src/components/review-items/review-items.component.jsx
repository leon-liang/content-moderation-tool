import {useEffect, useState} from 'react';

import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import ReviewItemsGeneralInformation from '../review-items-general-information/review-items-general-information.component';
import ReviewItemsPriorityLabel from "../review-items-priority-label/review-items-priority-label.component";
import ReviewItemsInformationOnThePlayer from '../review-items-information-on-the-player/review-items-informations-on-the-player.component';

import './review-items.styles.scss';
function ReviewItems(props) {
    const [selectedRow, setSelectedRow] = useState(0);
    const [filterByViolationType, setFilterByViolationType] = useState("All");
    const [sortByAssessedRisk, setSortByAssessedRisk] = useState("Descending");
    const [escalate, setEscalate] = useState(false);
    const [reviewItems, setReviewItems] = useState([
        {
            priority: "high",
            assessedRisk: 0.93,
            playerName: "Max Musterman",
            amountOfTimesReported: 3,
            suggestedAction: "Dangerous Speech",
            gameId: "Clash of Clans",
            preview: "Mother fuckers banned me, so it's gonna be a no go there.",
            date: "10.02.2023",
            violationType: [
                "Vulgarity"
            ]
        },
        {
            priority: "standard",
            assessedRisk: 0.21,
            playerName: "Max Musterman",
            amountOfTimesReported: 1,
            suggestedAction: "Hate",
            gameId: "Clash of Clans",
            preview: "Do you just try to hog cycle me huh?",
            date: "10.02.2023",
            violationType: [
                "Public Threat"
            ]

        },
        {
            priority: "medium",
            assessedRisk: 0.43,
            playerName: "Max Musterman",
            amountOfTimesReported: 7,
            suggestedAction: "Aggravation",
            gameId: "Clash of Clans",
            preview: "Mother fuckers banned me, so it's gonna be a no go there.",
            date: "10.02.2023",
            violationType: [
                "Vulgarity"
            ]
        }
    ])

    useEffect(() => {
        if (props.filter !== "all") {
            let result = reviewItems.filter((item) => {
                return item.priority.includes(props.filter);
            });
            setReviewItems(result);
        }
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        reviewItems.splice(selectedRow, 1);
    }

    const handleEscalate = () => {
        setEscalate(!escalate);
    }

    const setSuggestedAction = (index, action) => {
        let updatedReviewItems = [...reviewItems];
        let item = {...updatedReviewItems[index]};
        item.suggestedAction = action;
        updatedReviewItems[index] = item;
        setReviewItems(updatedReviewItems);
    }

    let result = reviewItems;

    if (filterByViolationType !== "All") {
        result = result.filter((item) => {
            return item.violationType.includes(filterByViolationType);
        });
    }

    result = result.sort((a, b) => {
        let sorted;
        if (sortByAssessedRisk === "Ascending") {
            sorted = a.assessedRisk - b.assessedRisk;
        } else {
            sorted = b.assessedRisk - a.assessedRisk;
        }
        return sorted;
    });

    result = result.map((item, index) => {
        return (
            <tr style={selectedRow === index ? {backgroundColor: "rgb(236, 236, 236)"} : {}} onClick={() => setSelectedRow(index)} key={index}>
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
                    <DropdownButton style={{"display": "inline-block", "paddingRight": "1rem"}} size="sm" variant="secondary" id="" title={filterByViolationType}>
                        <Dropdown.Item onClick={() => setFilterByViolationType("All")}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterByViolationType("Bullying")}>Bullying</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterByViolationType("Sexual Content")}>Sexual Content</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterByViolationType("Vulgarity")}>Vulgarity</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterByViolationType("Drugs / Alcohol")}>Drugs / Alcohol</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterByViolationType("Fraud")}>Fraud</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterByViolationType("Public Threat")}>Public Threat</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterByViolationType("Extremism")}>Extremism</Dropdown.Item>
                    </DropdownButton>

                    <p style={{"display": "inline-block", "paddingRight": "0.5rem"}}>Assessed Risk: </p>
                    <DropdownButton style={{"display": "inline-block"}} size="sm" variant="secondary" id="" title={sortByAssessedRisk}>
                        <Dropdown.Item onClick={() => setSortByAssessedRisk("Ascending")}>Ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortByAssessedRisk("Descending")}>Descending</Dropdown.Item>
                    </DropdownButton>
                </div>
                <Table bordered hover>
                    <thead>
                    <tr>
                        <th>Priority</th>
                        <th>Risk</th>
                        <th>Preview</th>
                        <th>Date</th>
                        <th>Violation</th>
                    </tr>
                    </thead>
                    <tbody>
                        {result}
                    </tbody>
                </Table>
            </div>
            {reviewItems.length !== 0 ? (
            <div className='review-items-details overflow-auto'>
                <h4 style={{"marginBottom": "1.5rem"}}>Details</h4>
                <p style={{"display": "inline-block", "paddingRight": "1rem"}}><strong>Date: </strong>{reviewItems[selectedRow].date}</p>
                <ReviewItemsPriorityLabel style={{"display": "inline-block"}} priority={reviewItems[selectedRow].priority}/>

                <p><strong>Player concerned: </strong>{reviewItems[selectedRow].playerName}'s Account</p>
                <p><strong>For review: </strong>{reviewItems[selectedRow].preview}</p>
                <p><strong>Violation type: </strong> {reviewItems[selectedRow].violationType.join(", ")}</p>

                <Accordion alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>General Information</Accordion.Header>
                        <Accordion.Body>
                            <ReviewItemsGeneralInformation amountOfTimesReported={reviewItems[selectedRow].amountOfTimesReported} gameId={reviewItems[selectedRow].gameId}/>
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
                            <ReviewItemsInformationOnThePlayer />
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
                <Form.Check
                    type="switch"
                    onClick={handleEscalate}
                    style={{"marginTop": "1rem"}}
                    id="custom-switch"
                    label="Escalate to supervisor"
                />
                <Form.Control hidden={!escalate} as="textarea" rows={3} style={{"marginTop": "0.5rem"}} placeholder={"Reason to escalate to supervisor."} />

                <Dropdown style={{"marginTop": "1rem", "display": "inline-block", "marginRight": "0.5rem"}}>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {reviewItems[selectedRow].suggestedAction}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Spamming / Scamming")}>Spamming / Scamming</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Political Identity")}>Political Identity</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Unintended")}>Unintended</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Pll")}>Pll</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Aggravation")}>Aggravation</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Habuku")}>Habuku</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Abuse of Play")}>Abuse of Play</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Harassment")}>Harassment</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Hate")}>Hate</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Inappropriate sharing")}>Inappropriate sharing</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Dangerous Speech")}>Dangerous Speech</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Extremism")}>Extremism</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Criminal or Predatory")}>Criminal or Predatory</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => setSuggestedAction(selectedRow, "Ignore")}>Ignore</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button style={{"display": "inline-block"}} variant="dark" onClick={handleShow}>Submit</Button>
            </div> ) : null }

            {reviewItems.length !== 0 ? (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {reviewItems[selectedRow].suggestedAction === "Ignore" ? "The reviewed item will be ignored." : "The reviewed item will be classified as " + reviewItems[selectedRow].suggestedAction + "."}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={() => {
                        handleClose(); handleSubmit();
                    }}>
                        Submit Changes
                    </Button>
                </Modal.Footer>
            </Modal> ) : null}
        </div>
    )
}

export default ReviewItems;
