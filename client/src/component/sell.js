import React, { useState } from "react";
import { Link } from 'react-router-dom'


function Sell(props) {
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState()

    function buyStokes() {
        fetch(`http://localhost:8080/spark/sell`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemPrice: price, itemQuantity: quantity,
                itemId: props.id, type: 0,
                 personId: props.personId, stoke_name: props.stokeName,
                 person_name: props.personName
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("data:", data);
            })
    }

    return (
        <div>
            <h1 className='welcome'>Sell</h1>
            <form name="buying-form" id="buying" className="input-group" >
                <input onChange={(ev) => setQuantity(ev.target.value)} name="password" type="number"
                    className="input-field" placeholder="Enter quantity" value={quantity} required />
                <input onChange={(ev) => setPrice(ev.target.value)} name="password" type="number"
                    className="input-field" placeholder="Enter price" value={price} required />
            </form>
            <button onClick={buyStokes} id="submit-login-btn" type="submit" className="submit-btn">
                SELL!
            </button>
        </div>
    )
}


export default Sell;