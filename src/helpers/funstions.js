import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import moment from "moment";

export const RedirectUser = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(props.url)
    }, [props])

    return (<React.Fragment></React.Fragment>);

}

export const ucFirst = (string) => {
    if(!string) return string
    return string.charAt(0).toUpperCase() + string.slice(1);
    
}

export const formatDate = (dateString) => {
    return moment(dateString).fromNow();
}