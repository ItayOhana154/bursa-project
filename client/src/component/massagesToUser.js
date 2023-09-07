import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'


function MassagesToUser(props) {
    const [massages, setMassages] = useState([]);
    useEffect(() => {
        let massagesData = [...massages]
        console.log("props.personId:", props.personId);
        fetch(`http://localhost:8081/users/masseges/${props.personId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("dataaaaa:", data);
                massagesData = data;
                setMassages(massagesData)
            })
    }, [])

    return (
        <div>
            <h3>Massages:</h3>
            {console.log("massages:", massages)}
            <ul>
                {massages ? massages.map((item, index) => {
                    return <li key={index}>{item.Message}</li>
                }) : <p>you have no massegase</p>}
            </ul>
        </div>
    )
}

export default MassagesToUser;