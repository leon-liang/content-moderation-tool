import React, {useEffect, useState} from 'react';

import './review-items-information-on-the-player.styles.scss';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
);

function ReviewItemsInformationOnThePlayer() {
    const data = {
        labels: ['Bullying', 'Sexual Content', 'Vulgarity', 'Drug / Alcohol', 'Public Threat', 'Extremism'],
        datasets: [
            {
                data: [0.2, 0, 0.02, 0, 2.06, 0.3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div>
            <p><strong></strong></p>
            <p><strong>Recent messaging traits:</strong></p>
            <div className="center" style={{"width": "50%"}}>
                <Radar style={{"paddingTop": "0"}} data={data} />
            </div>
        </div>
    )
}

export default ReviewItemsInformationOnThePlayer;


