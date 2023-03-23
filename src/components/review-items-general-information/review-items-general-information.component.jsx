import React from 'react';
import './review-items-general-information.styles.scss';

const ReviewItemsGeneralInformation = (props) => {
    return (
        <div>
            <p><strong>Number of times the reportee was reported:</strong> {props.amountOfTimesReported}</p>
            <p><strong>Game ID:</strong> {props.gameId}</p>
        </div>
    )
}

export default ReviewItemsGeneralInformation;