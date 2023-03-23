import React from "react";

import Button from 'react-bootstrap/Button';

const ReviewItemsPriorityLabel = (props) => {

    const { priority } = props

    switch (true) {
        case (priority < 0):
            return <Button variant="secondary" size='sm'>Low</Button>
        case (priority < 4):
            return <Button variant="primary" size='sm'>Standard</Button>
        case (priority < 6):
            return <Button variant="warning" size='sm'>Medium</Button>
        case (priority < 8):
            return <Button variant="danger" size='sm'>High</Button>
    }
}

export default ReviewItemsPriorityLabel;