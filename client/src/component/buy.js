import React, { useState } from "react";
import { Link } from 'react-router-dom'


function Buy(props) {
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState()

    function buyStokes() {
        fetch(`http://localhost:8080/sparkLog/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ username: userName, password: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("data:", data);
            })
    }

    return (
        <div>
            <h1 className='welcome'>Buy</h1>
            <form name="buying-form" id="buying" className="input-group" >
                <input onChange={(ev) => setQuantity(ev.target.value)} name="password" type="password"
                    className="input-field" placeholder="Enter quantity" value={quantity} required />
                <input onChange={(ev) => setPrice(ev.target.value)} name="password" type="password"
                    className="input-field" placeholder="Enter price" value={price} required />
            </form>
            <button onClick={buyStokes} id="submit-login-btn" type="submit" className="submit-btn">
                BUY!
            </button>
        </div>
    )
}

export default Buy;