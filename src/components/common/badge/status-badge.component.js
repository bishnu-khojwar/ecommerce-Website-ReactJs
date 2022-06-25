import { Badge } from "react-bootstrap"
import React from "react"
import {ucFirst} from "../../../helpers/funstions"
export const StatusBadge = (props) => {
    return (
        <>
            <Badge bg={props.value === 'active' ? 'success' : 'danger'}>
                {ucFirst(props.value)}
            </Badge>
        </>
    )
} 