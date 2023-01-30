import React, {useContext, useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import {stokeIdContext} from "./stokeNameContext";
import Buy from "./buy";
import Sell from "./sell";


function Company() {
    const [stoke, setStoke] = useState("")
    const stokeNumId = useContext(stokeIdContext);
    useEffect(() => {
        fetch(`http://localhost:8080/spark/main/stoke/${stokeNumId.stokeId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data:", data);
                setStoke(data)
            })
    }, [])

    return (
        <div>
            <div>
            <h1 className='welcome'>Company</h1>
            <p>stoke name - {stoke[0] ? stoke[0].stoke_name : null}</p>
            <p>stoke Quantity - {stoke[0] ? stoke[0].Quantity : null}</p>
            <p>stoke available - {stoke[0] ? stoke[0].stoke_available : null}</p>
            <p>stoke price - {stoke[0] ? stoke[0].stoke_price : null}</p>
            </div>
            <Buy />
            <Sell />
            <button>BUY</button>
            <button>SELL</button>
        </div>
    )
}

export default Company;